const SceneController = require('../../../controllers/sceneController');
const Scene = require('../../../models/Scene');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));

const mockRes = { status: mockStatus };

describe("Scene controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getSceneByOrder", () => {

    it("should return 200 and scene data when found", async () => {
      const mockScene = { id: 1, character_id: 2, scene_order: 1 };
      const mockReq = { params: { characterId: "2", order: "1" } };

      jest.spyOn(Scene, "getByCharacterAndOrder")
        .mockResolvedValue(mockScene);

      await SceneController.getSceneByOrder(mockReq, mockRes);

      expect(Scene.getByCharacterAndOrder)
        .toHaveBeenCalledWith("2", 1);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockScene);
    });

    it("should return 404 if scene not found", async () => {
      const mockReq = { params: { characterId: "2", order: "1" } };

      jest.spyOn(Scene, "getByCharacterAndOrder")
        .mockResolvedValue(null);

      await SceneController.getSceneByOrder(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Scene not found" });
    });

    it("should return 500 if model throws error", async () => {
      const mockReq = { params: { characterId: "2", order: "1" } };

      jest.spyOn(Scene, "getByCharacterAndOrder")
        .mockRejectedValue(new Error("DB fail"));

      await SceneController.getSceneByOrder(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB fail" });
    });

  });
});
