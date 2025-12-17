const Character = require("../../../models/Character");
const db = require("../../../db/connect");

describe("Character", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    it("Retrieve all the characters", async () => {
      // Arrange
      const mockCharacter = [
        {id: 1, storyId: 1, name: "C1", description: "C2"},
        {id: 1, storyId: 1, name: "C1", description: "C2"},
      ]

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockStory] });

      // Act
      const result = await Story.getAll();

      // Assert
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0].title).toBe('t1');
      expect(db.query).toHaveBeenCalledWith(
        `
      SELECT id, title, description, is_active FROM stories
      `
      );
    });

    it("returns [] when no story is found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Story.getAll();

      // Assert
      expect(result).toBe([]);
    });
  })
})