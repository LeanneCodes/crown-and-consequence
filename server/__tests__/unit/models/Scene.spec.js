const Scene = require("../../../models/Scene");
const db = require("../../../db/connect");

describe("Scene", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getByCharacterAndOrder", () => {
    it("will show a scene that matches the story and the character", async () => {
      // Arrange
      const mockScene = {
        id: 1,
        character_id: 2,
        scene_order: 1,
        image: null,
        narrative: "Test narrative",
        question: "Test question?",
        option_a: "A",
        option_b: "B",
        correct_option: "A",
        feedback_correct: "Correct",
        feedback_wrong: "Wrong",
        points: 10,
        is_final: false,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockScene] });

      // Act
      const result = await Scene.getByCharacterAndOrder(2, 1);

      // Assert
      expect(result).toBeInstanceOf(Scene);
      expect(result.id).toBe(1);
      expect(result.character_id).toBe(2);
      expect(result.scene_order).toBe(1);
      expect(result.narrative).toBe("Test narrative");

      expect(db.query).toHaveBeenCalledWith(
    `
    SELECT *
    FROM scenes
    WHERE character_id = $1
    AND scene_order = $2
    LIMIT 1
    `,
        [2, 1]
      );
    });

    it("returns null when no scene is found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Scene.getByCharacterAndOrder(-1, -1);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getById", () => {
    it("resolves with a Scene instance on successful db query", async () => {
      // Arrange
      const mockScene = {
        id: 5,
        character_id: 1,
        scene_order: 3,
        image: null,
        narrative: "Another narrative",
        question: "Another question?",
        option_a: "Option A",
        option_b: "Option B",
        correct_option: "B",
        feedback_correct: "Correct again",
        feedback_wrong: "Wrong again",
        points: 15,
        is_final: true,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockScene] });

      // Act
      const result = await Scene.getById(5);

      // Assert
      expect(result).toBeInstanceOf(Scene);
      expect(result.id).toBe(5);
      expect(result.is_final).toBe(true);

      expect(db.query).toHaveBeenCalledWith(
        `
      SELECT *
      FROM scenes
      WHERE id = $1
      LIMIT 1
      `,
        [5]
      );
    });

    it("returns null when scene does not exist", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Scene.getById(-1);

      // Assert
      expect(result).toBeNull();
    });
  });
});
