const db = require("../db/connect");

class Story {
  constructor({ id, title, description, is_active }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isActive = is_active; // if the story is active, the frontend will add interaction to that story
  }

  static async getAll() {
    const response = await db.query(`
      SELECT id, title, description, is_active
      FROM stories;
    `);

    if (response.rows.length === 0) {
      return [];
    }

    return response.rows.map(row => new Story(row));
  }
}

module.exports = Story;
