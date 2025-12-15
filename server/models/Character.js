const db = require("../db/connect")
// Assuming table is called characters
class Character {

  constructor({character_id, name, story_id}) {
    this.character_id = character_id
    this.name = name
    this.story_id = story_id
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM characters WHERE story_id = $1;', [story_id]) //country refers to the name of the TABLE in the SQL file
    if (response.rows.length === 0) {
        throw new Error('No characters available')
    }
        return response.rows.map(c => new Character(c))
    }
}

module.exports = Character
