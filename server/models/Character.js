const db = require("../db/connect");

class Character {
  constructor({ id, story_id, name, description, is_active, image }) {
    this.id = id;
    this.storyId = story_id;
    this.name = name;
    this.description = description;
    this.isActive = is_active;  // if the story is active, the frontend will add interaction to that story
    this.image = image;
  }

  static async getAll() {  // retrieving characters based on the story chosen
    const response = await db.query(
      `
      SELECT id, story_id, name, description, is_active, image
      FROM characters;
      `
    );

    return response.rows.map(row => new Character(row));
  }

  static async getByStoryId(storyId) {  // retrieving characters based on the story chosen
    const response = await db.query(
      `
      SELECT id, story_id, name, description, is_active, image
      FROM characters
      WHERE story_id = $1;
      `,
      [storyId]
    );

    return response.rows.map(row => new Character(row));
  }
}

module.exports = Character;
