const storyController = require("../../../controllers/storyController");
const Story = require("../../../models/Story");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));

const mockRes = { status: mockStatus };

describe("Story controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    it("should return stories with a status code 200", async () => {
      // Arrange
      const testStories = [
        { id: 1, title: "Story 1" },
        { id: 2, title: "Story 2" }
      ];

      jest.spyOn(Story, "getAll").mockResolvedValue(testStories);

      // Act
      await storyController.index(null, mockRes);

      // Assert
      expect(Story.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testStories);
    });

    it("should return an error upon failure", async () => {
      // Arrange
      jest.spyOn(Story, "getAll").mockRejectedValue(new Error("DB error"));

      // Act
      await storyController.index(null, mockRes);

      // Assert
      expect(Story.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });
});
