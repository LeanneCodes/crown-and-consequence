const db = require("../db/connect");

class Progress {
  constructor({
    id,
    user_id,
    story_id,
    character_id,
    current_scene_id,
    score,
    completed
  }) {
    this.id = id;
    this.user_id = user_id;
    this.story_id = story_id;
    this.character_id = character_id;
    this.current_scene_id = current_scene_id;
    this.score = score;
    this.completed = completed;
  }

  static async getByUserAndStory(userId, storyId) { // Get progress for a user and story (these IDs will come from the controller req.body)
    const response = await db.query(
      `SELECT *
       FROM progress
       WHERE user_id = $1 AND story_id = $2;`,
      [userId, storyId]
    );

    if (response.rows.length === 0) return null;

    return new Progress(response.rows[0]);
  }

  static async create({  // Create new progress record, if one does not currently exist
    user_id,
    story_id,
    character_id,
    current_scene_id
  }) {
    const response = await db.query(
      `INSERT INTO progress
       (user_id, story_id, character_id, current_scene_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [user_id, story_id, character_id, current_scene_id]
    );

    return new Progress(response.rows[0]);
  }

  static async updateProgress({ // Update scene and score
    user_id,
    story_id,
    current_scene_id,
    score,
    completed = false
  }) {
    const response = await db.query(
      `UPDATE progress
       SET current_scene_id = $1,
           score = $2,
           completed = $3
       WHERE user_id = $4 AND story_id = $5
       RETURNING *;`,
      [current_scene_id, score, completed, user_id, story_id]
    );

    return new Progress(response.rows[0]);
  }

  // No need to delete progress. We only want to view, create and update progress
}

module.exports = Progress;
