const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const userController = require("../../../controllers/authController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("User controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  // SIGNUP
  describe("signup", () => {
    let mockReq;
    let mockUser;

    beforeEach(() => {
      mockReq = {
        body: { username: "max", email: "test@test.com", password: "pw123" },
      };

      mockUser = { id: 1, username: "max", email: "test@test.com" };
    });

    it("should return 201 and create user successfully", async () => {

      // Arrange
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashed_pw");
      jest.spyOn(User, "create").mockResolvedValue(mockUser);

      // Act
      await userController.signup(mockReq, mockRes);

      // Assert
      expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith("pw123", "salt");
      expect(User.create).toHaveBeenCalledTimes(1);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 on failure", async () => {

      // Arrange
      bcrypt.genSalt.mockRejectedValue(new Error("salt fail"));

      // Act
      await userController.signup(mockReq, mockRes);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "salt fail" });
    });
  });

  // LOGIN
  describe("login", () => {
    let mockReq;
    let mockUser;

    beforeEach(() => {
      mockReq = {
        body: { email: "test@test.com", password: "password" },
      };

      mockUser = {
        id: 1,
        email: "test@test.com",
        password: "hashed_pw",
      };
    });

    it("should return 200 and JWT token when login succeeds", async () => {

      // Arrange
      jest.spyOn(User, "findByEmail").mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "fake.jwt.token");
      });

      // Act
      await userController.login(mockReq, mockRes);

      // Assert
      expect(User.findByEmail).toHaveBeenCalledWith("test@test.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed_pw");

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        token: "fake.jwt.token",
      });
    });

    it("should return 401 if password does not match", async () => {

      // Arrange
      jest.spyOn(User, "findByEmail").mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      // Act
      await userController.login(mockReq, mockRes);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        error: "User could not be authenticated",
      });
    });

    it("should return 401 if user is missing", async () => {

      // Arrange
      jest.spyOn(User, "findByEmail").mockRejectedValue(
        new Error("Unable to locate user.")
      );

      // Act
      await userController.login(mockReq, mockRes);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Unable to locate user.",
      });
    });
  });

  // DELETE ACCOUNT
  describe("deleteAccount", () => {
    let mockReq;
    let mockUser;

    beforeEach(() => {
      mockReq = {
        body: { email: "test@test.com", password: "password" },
      };

      mockUser = {
        id: 1,
        email: "test@test.com",
        password: "hashed_pw",
      };
    });

    it("should return 200 and delete user successfully", async () => {

      // Arrange
      jest.spyOn(User, "findByEmail").mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jest.spyOn(User, "deleteByEmail").mockResolvedValue(true);

      // Act
      await userController.deleteAccount(mockReq, mockRes);

      // Assert
      expect(User.findByEmail).toHaveBeenCalledWith("test@test.com");
      expect(User.deleteByEmail).toHaveBeenCalledTimes(1);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message: "Account Deleted",
      });
    });

    it("should return 401 when user is missing", async () => {

      // Arrange
      jest.spyOn(User, "findByEmail").mockRejectedValue(
        new Error("Unable to locate user.")
      );

      // Act
      await userController.deleteAccount(mockReq, mockRes);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Unable to locate user.",
      });
    });
  });

});
