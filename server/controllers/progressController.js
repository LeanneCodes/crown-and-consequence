const Progress = require('../models/Progress');

const create = async (req, res) => {
  try {
    const { userId, storyId, characterId } = req.body;

    if (!userId || !storyId || !characterId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await Progress.getByUserStoryAndCharacter(
      userId,
      storyId,
      characterId
    );

    if (existing) {
      return res.status(200).json(existing);
    }

    const progress = await Progress.create({
      user_id: userId,
      story_id: storyId,
      character_id: characterId,
      current_scene_id: 1
    });

    res.status(201).json(progress);
  } catch (err) {
    console.error('CREATE PROGRESS ERROR:', err);
    res.status(500).json({ error: 'Failed to create progress' });
  }
};

const getByUserAndStory = async (req, res) => {
  try {
    const { userId, storyId, characterId } = req.params;

    const progress = await Progress.getByUserStoryAndCharacter(
      Number(userId),
      Number(storyId),
      Number(characterId)
    );

    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.status(200).json(progress);
  } catch (err) {
    console.error('GET PROGRESS ERROR:', err);
    res.status(500).json({ error: 'Failed to retrieve progress' });
  }
};

const update = async (req, res) => {
  try {
    const { userId, storyId, characterId } = req.params;
    const { currentScene, score, completed } = req.body;

    const updated = await Progress.updateProgress({
      user_id: Number(userId),
      story_id: Number(storyId),
      character_id: Number(characterId),
      current_scene_id: currentScene,
      score,
      completed
    });

    if (!updated) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('UPDATE PROGRESS ERROR:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

module.exports = {
  create,
  getByUserAndStory,
  update
};
