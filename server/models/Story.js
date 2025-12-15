const db = require("../db/connect")
// Assuming table is called stories
class Story {

  constructor({story_id, title, description}) {
    this.story_id = story_id
    this.title = title
    this.description = description
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM stories;') //country refers to the name of the TABLE in the SQL file
    if (response.rows.length === 0) {
        throw new Error('No stories available')
    }
        return response.rows.map(c => new Story(c))
    }
}

module.exports = Story