const characterController = require("../../../controllers/characterController");
const Character = require("../../../models/Character");

// Mocking response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));

const mockRes = { status: mockStatus };

describe("Character controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  //index is never used, so no need to test

  describe("getOne function, tests getAllByOneId", () => {
    it("should return characters filtered by story_id with a 200 status code", async () => {
      // Arrange
      const testCharacters = [
        { id: 1, name: "Hero" },
        { id: 2, name: "Villain" }
      ];

      const mockReq = { params: { id: 10 } };

      jest.spyOn(Character, "getByStoryId").mockResolvedValue(testCharacters);

      // Act
      await characterController.getOne(mockReq, mockRes);

      // Assert
      expect(Character.getByStoryId).toHaveBeenCalledTimes(1);
      expect(Character.getByStoryId).toHaveBeenCalledWith(10);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testCharacters);
    });

    it("should return an error upon failure", async () => {
      // Arrange
      const mockReq = { params: { id: 11 } };

      jest.spyOn(Character, "getByStoryId").mockRejectedValue(new Error("Error retrieving characters"));

      // Act
      await characterController.getOne(mockReq, mockRes);

      // Assert
      expect(Character.getByStoryId).toHaveBeenCalledTimes(1);
      expect(Character.getByStoryId).toHaveBeenCalledWith(11);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Error retrieving characters" });
    });
  });
});
