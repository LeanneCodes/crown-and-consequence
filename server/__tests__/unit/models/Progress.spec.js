const Progress = require("../../../models/Progress");
const db = require("../../../db/connect");

describe("Progress", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getByUserAndStory", () => {
    it("resolves with progress on successful db query", async () => {
      // Arrange
      const testProgress = {
        id: 1,
        user_id: 1,
        story_id: 2,
        character_id: 3,
        current_scene_id: 4,
        score: 10,
        completed: false,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testProgress] });

      // Act
      const result = await Progress.getByUserAndStory(1, 2);

      // Assert
      expect(result).toBeInstanceOf(Progress);
      expect(result.user_id).toBe(1);
      expect(result.story_id).toBe(2);
      expect(result.score).toBe(10);

      expect(db.query).toHaveBeenCalledWith(
        `SELECT *
       FROM progress
       WHERE user_id = $1 AND story_id = $2;`,
        [1, 2]
      );
    });

    it("returns null when progress is not found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Progress.getByUserAndStory(-1, -1);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getByUserStoryAndCharacter", () => {
    it("resolves with progress on successful db query", async () => {
      // Arrange
      const testProgress = {
        id: 2,
        user_id: 1,
        story_id: 2,
        character_id: 4,
        current_scene_id: 5,
        score: 20,
        completed: false,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testProgress] });

      // Act
      const result = await Progress.getByUserStoryAndCharacter(1, 2, 4);

      // Assert
      expect(result).toBeInstanceOf(Progress);
      expect(result.character_id).toBe(4);
      expect(result.current_scene_id).toBe(5);

      expect(db.query).toHaveBeenCalledWith(
        `SELECT *
     FROM progress
     WHERE user_id = $1
       AND story_id = $2
       AND character_id = $3;`,
        [1, 2, 4]
      );
    });

    it("returns null when progress is not found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act
      const result = await Progress.getByUserStoryAndCharacter(1, 2, -1);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("resolves with progress on successful creation", async () => {
      // Arrange
      const progressData = {
        user_id: 1,
        story_id: 2,
        character_id: 3,
        current_scene_id: 1,
      };

      const createdProgress = {
        id: 3,
        ...progressData,
        score: 0,
        completed: false,
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [createdProgress] });

      // Act
      const result = await Progress.create(progressData);

      // Assert
      expect(result).toBeInstanceOf(Progress);
      expect(result.user_id).toBe(1);
      expect(result.current_scene_id).toBe(1);

      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO progress
       (user_id, story_id, character_id, current_scene_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
        [
          progressData.user_id,
          progressData.story_id,
          progressData.character_id,
          progressData.current_scene_id,
        ]
      );
    });
  });

  describe("updateProgress", () => {
    it("resolves with updated progress on successful update", async () => {
      // Arrange
      const updatedProgress = {
        id: 4,
        user_id: 1,
        story_id: 2,
        character_id: 3,
        current_scene_id: 2,
        score: 30,
        completed: true,
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [updatedProgress] });

      // Act
      const result = await Progress.updateProgress({
        user_id: 1,
        story_id: 2,
        current_scene_id: 2,
        score: 30,
        completed: true,
      });

      // Assert
      expect(result).toBeInstanceOf(Progress);
      expect(result.current_scene_id).toBe(2);
      expect(result.score).toBe(30);
      expect(result.completed).toBe(true);

      expect(db.query).toHaveBeenCalledWith(
        `UPDATE progress
       SET current_scene_id = $1,
           score = $2,
           completed = $3
       WHERE user_id = $4 AND story_id = $5
       RETURNING *;`,
        [2, 30, true, 1, 2]
      );
    });
  });
});
