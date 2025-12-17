const Character = require("../../../models/Character");
const db = require("../../../db/connect");

describe("Character", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    it("Retrieve all the characters", async () => {
      // Arrange
      const mockStory = [
        {id: 1, title:"t1", description: "td1", is_active: true},
        {id: 2, title:"t2", description: "td2", is_active: true},
        {id: 3, title:"t3", description: "td3", is_active: true}
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