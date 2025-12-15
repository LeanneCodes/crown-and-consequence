const db = require("../db/connect")
// Assuming table is called stories
class Story {

  constructor({story_id, story_name, description, img}) {
    this.story_id = story_id
    this.story_name = story_name
    this.description = description
    this.img = img
  }

  static async getAll() { // see all the stories from the database
    const response = await db.query('SELECT * FROM stories;')
    if (response.rows.length === 0) {
        throw new Error('No stories available')
    }
        return response.rows.map(c => new Story(c))
    }
}

module.exports = Story