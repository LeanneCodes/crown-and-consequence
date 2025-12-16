const Scene = require('../models/Scene');

async function getSceneByOrder(req, res) {
  const { characterId, order } = req.params;

  try {
    const scene = await Scene.getByCharacterAndOrder(
      characterId,
      Number(order)
    );

    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }

    res.status(200).json(scene);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getSceneByOrder
};
