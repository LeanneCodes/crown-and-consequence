const db = require("../db/connect")
// Assuming table is called characters

//IN PROGRESS
class Progress {

  constructor({character_id, name, story_id}) {
    this.character_id = character_id
    this.name = name
    this.story_id = story_id
  }

  static async Trirad() {
    const response = await db.query('SELECT * FROM answers WHERE question_id = $1 AND answer_id = $2;', [question_id, answer_id]) //country refers to the name of the TABLE in the SQL file
    if (response.rows.length === 0) {
        throw new Error('Wrong answer selected')
    }
        return response.rows.map(c => new Character(c))
    }

    async checkAnswer(userId) {
        const response = await db.query('SELECT * FROM answers WHERE question_id = $1 AND answer_id = $2;', [question_id, answer_id]) 
        if (response.rows.length === 0) {
        throw new Error('Wrong answer selected')
    } else {
        const result = await db.query('UPDATE users SET score = score + 1 WHERE user_id = $1 RETURNING user_id, score;', [userId]
    );

    if (result.rows.length !== 1) {
      throw new Error("Failed to update user score");
    }
    }
}
}

const db = require("../db/connect");

module.exports = Progress;
