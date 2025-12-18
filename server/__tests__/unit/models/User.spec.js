const User = require("../../../models/User");
const db = require("../../../db/connect");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("create", () => {
    it("resolves with user on successful creation", async () => {
      // Arrange
      const userData = {
        username: "max",
        email: "max@test.com",
        password: "hashed_pw"
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              username: "max",
              email: "max@test.com",
              password: "hashed_pw"
            },
          ],
        }); // findById

      // Act
      const result = await User.create(userData);

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(1);
      expect(result.username).toBe("max");
      expect(result.email).toBe("max@test.com");

      expect(db.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;",
        [userData.username, userData.email, userData.password]
      );

      expect(db.query).toHaveBeenNthCalledWith(
        2,
        "SELECT * FROM users WHERE id = $1",
        [1]
      );
    });
  });

  describe("findByUsername", () => {
    it("resolves with user when username exists", async () => {
      // Arrange
      const testUser = {
        id: 1,
        username: "max",
        email: "max@test.com",
        password: "hashed_pw"
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      // Act
      const result = await User.findByUsername("max");

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("max");

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        ["max"]
      );
    });

    it("returns null when username does not exist", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await User.findByUsername("ghost");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("resolves with user when email exists", async () => {
      // Arrange
      const testUser = {
        id: 2,
        username: "sophie",
        email: "sophie@test.com",
        password: "hashed_pw"
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      // Act
      const result = await User.findByEmail("sophie@test.com");

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.email).toBe("sophie@test.com");

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1;",
        ["sophie@test.com"]
      );
    });

    it("should throw an Error when email is not found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(User.findByEmail("missing@test.com")).rejects.toThrow(
        "Unable to locate user."
      );
    });
  });

  describe("findById", () => {
    it("resolves with user on successful db query", async () => {
      // Arrange
      const testUser = {
        id: 3,
        username: "test",
        email: "test@test.com",
        password: "hashed_pw"
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      // Act
      const result = await User.findById(3);

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(3);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        [3]
      );
    });

    it("should throw an Error when user is not found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(User.findById(-1)).rejects.toThrow("Unable to locate user.");
    });
  });

  describe("updatePassword", () => {
    it("resolves with updated user on successful update", async () => {
      // Arrange
      const updatedUser = {
        username: "max",
        email: "max@test.com",
        password: "new_hash"
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [updatedUser] });

      // Act
      const result = await User.updatePassword("max", "new_hash");

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("max");

      expect(db.query).toHaveBeenCalledWith(
        `UPDATE users
      SET password = $1
      WHERE username = $2
      RETURNING username, email;
      `,
        ["new_hash", "max"]
      );
    });

    it("should throw an Error when user is not found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(User.updatePassword("ghost", "pw")).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("deleteByEmail", () => {
    it("resolves with confirmation message on successful deletion", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ id: 1, email: "max@test.com" }],
      });

      // Act
      const result = await User.deleteByEmail("max@test.com");

      // Assert
      expect(result).toBe("User successfully deleted");

      expect(db.query).toHaveBeenCalledWith(
        `
      DELETE FROM users
      WHERE email = $1
      RETURNING *;
      `,
        ["max@test.com"]
      );
    });

    it("should throw an Error when user does not exist", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(User.deleteByEmail("missing@test.com")).rejects.toThrow(
        "User not found"
      );
    });
  });
});
