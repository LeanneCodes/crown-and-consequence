const db = require("../db/connect")
// Assuming table is called scene
class Scene {

  constructor({scene_id, character_id, question_id, answer_id, progress_id, user_id}) {
    this.scene_id = scene_id
    this.character_id = character_id
    this.question_id = question_id
    this.answer_id = answer_id
    this.progress_id = progress_id
    this.user_id = user_id
  }

  static async getFirstScene() { // see one scene at a time
    const response = await db.query('SELECT scene_id FROM scenes LIMIT 1;')
    if (response.rows.length === 0) {
        throw new Error('No scenes available')
    }
        return response.rows.map(c => new Scene(c))
    }

    static async getAllScenes(data) {
        const { user_id, user_name, password, progress } = data
        const response = await db.query('SELECT * FROM scenes s JOIN users u ON u.progress_id = s.scene_id WHERE ')
    }
}

module.exports = Scene