const db = require("../db/connect");

class Scene {
  constructor({
    id,
    character_id,
    scene_order,
    image,
    narrative,
    question,
    option_a,
    option_b,
    correct_option,
    feedback_correct,
    feedback_wrong,
    points,
    is_final
  }) {
    this.id = id;
    this.character_id = character_id;
    this.scene_order = scene_order;
    this.image = image;
    this.narrative = narrative;
    this.question = question;
    this.option_a = option_a;
    this.option_b = option_b;
    this.correct_option = correct_option;
    this.feedback_correct = feedback_correct;
    this.feedback_wrong = feedback_wrong;
    this.points = points;
    this.is_final = is_final;
  }

  // Get ONE scene by character + order (1–4)
  static async getByCharacterAndOrder(characterId, order) {
    const response = await db.query(
      `
      SELECT *
      FROM scenes
      WHERE character_id = $1
        AND scene_order = $2
      LIMIT 1
      `,
      [characterId, order]
    );

    if (response.rows.length === 0) {
      return null;
    }

    return new Scene(response.rows[0]);
  }

  // Get ONE scene by ID
  static async getById(id) {
    const response = await db.query(
      `
      SELECT *
      FROM scenes
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    if (response.rows.length === 0) {
      return null;
    }

    return new Scene(response.rows[0]);
  }
}

module.exports = Scene;
