const Character = require("../../../models/Character");
const db = require("../../../db/connect");

describe("Character", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    it("returns all characters", async () => {
      // Arrange
      const mockCharacters = [
        {
          id: 1,
          story_id: 1,
          name: "Hero",
          description: "Main character",
          is_active: true,
          image: "hero.png",
        },
        {
          id: 2,
          story_id: 1,
          name: "Villain",
          description: "Antagonist",
          is_active: false,
          image: "villain.png",
        },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockCharacters });

      // Act
      const result = await Character.getAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Character);

      expect(result[0].id).toBe(1);
      expect(result[0].storyId).toBe(1);
      expect(result[0].name).toBe("Hero");
      expect(result[0].isActive).toBe(true);

      expect(db.query).toHaveBeenCalledWith(
      `
      SELECT id, story_id, name, description, is_active, image
      FROM characters;
      `
      );
    });

    it("returns an empty array when no characters exist", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Character.getAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("getByStoryId", () => {
    it("resolves with characters on successful db query", async () => {
      // Arrange
      const testCharacters = [
        {
          id: 1,
          story_id: 2,
          name: "Hero",
          description: "Main character",
          is_active: true,
          image: null,
        },
        {
          id: 2,
          story_id: 2,
          name: "Villain",
          description: "Antagonist",
          is_active: false,
          image: null,
        },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: testCharacters });

      // Act
      const result = await Character.getByStoryId(2);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Character);
      expect(result[0].name).toBe("Hero");
      expect(result[0].storyId).toBe(2);

      expect(db.query).toHaveBeenCalledWith(
        `
      SELECT id, story_id, name, description, is_active, image
      FROM characters
      WHERE story_id = $1;
      `,
        [2]
      );
    });

    it("returns an empty array when no characters are found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Character.getByStoryId(999);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
