jest.mock(require.resolve("../../../db/connect"), () => ({
  query: jest.fn(),
}));
test("confirm mock is active", () => {
  expect(db.query).toBeDefined();
  expect(jest.isMockFunction(db.query)).toBe(true);
});

const User = require("../../../models/User");
const db = require("../../../db/connect");

describe("User Model", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // keeps database mock intact, apparently
  });

  // CREATE USER
  describe("create()", () => {
    it("resolves with a new User object when insert + lookup succeed", async () => {
      const userData = {
        username: "max",
        email: "max@test.com",
        password: "hashed_pw",
      };

      db.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT
        .mockResolvedValueOnce({
          rows: [{
            id: 1,
            username: "max",
            email: "max@test.com",
            password: "hashed_pw",
          }],
        });

      const result = await User.create(userData);

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

  // FIND BY USERNAME
  describe("findByUsername()", () => {
    it("returns a User object when found", async () => {
      const testUser = {
        id: 1,
        username: "max",
        email: "max@test.com",
        password: "hashed_pw",
      };

      db.query.mockResolvedValueOnce({ rows: [testUser] });

      const result = await User.findByUsername("max");

      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("max");

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        ["max"]
      );
    });

    it("returns null when not found", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const result = await User.findByUsername("ghost");

      expect(result).toBeNull();
    });
  });

  // FIND BY EMAIL
  describe("findByEmail()", () => {
    it("returns User when email exists", async () => {
      const testUser = {
        id: 2,
        username: "sophie",
        email: "sophie@test.com",
        password: "hashed_pw",
      };

      db.query.mockResolvedValueOnce({ rows: [testUser] });

      const result = await User.findByEmail("sophie@test.com");

      expect(result).toBeInstanceOf(User);
      expect(result.email).toBe("sophie@test.com");

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1;",
        ["sophie@test.com"]
      );
    });

    it("throws error when email not found", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.findByEmail("missing@test.com"))
        .rejects
        .toThrow("Unable to locate user.");
    });
  });

  // FIND BY ID
  describe("findById()", () => {
    it("returns User when record exists", async () => {
      const testUser = {
        id: 3,
        username: "test",
        email: "test@test.com",
        password: "hashed_pw",
      };

      db.query.mockResolvedValueOnce({ rows: [testUser] });

      const result = await User.findById(3);

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(3);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        [3]
      );
    });

    it("throws error when not found", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.findById(-1))
        .rejects
        .toThrow("Unable to locate user.");
    });
  });

  // UPDATE PASSWORD
  describe("updatePassword()", () => {
    it("returns updated User when successful", async () => {
      const updatedUser = {
        username: "max",
        email: "max@test.com",
        password: "new_hash",
      };

      db.query.mockResolvedValueOnce({ rows: [updatedUser] });

      const result = await User.updatePassword("max", "new_hash");

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

    it("throws when user not found", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.updatePassword("ghost", "pw"))
        .rejects
        .toThrow("User not found");
    });
  });

  // DELETE
  describe("deleteByEmail()", () => {
    it("confirms deletion when successful", async () => {
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: "max@test.com" }],
      });

      const result = await User.deleteByEmail("max@test.com");

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

    it("throws when user does not exist", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.deleteByEmail("missing@test.com"))
        .rejects
        .toThrow("User not found");
    });
  });
});
