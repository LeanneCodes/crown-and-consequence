const db = require("../db/connect");

class User {
  constructor({ id, username, email, password_hash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
  }

  static async create({ username, email, password_hash }) {
    const response = await db.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, password_hash;
      `,
      [username, email, password_hash]
    );

    return new User(response.rows[0]);
  }

  static async findByEmail(email) {
    const response = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1;
      `,
      [email]
    );

    return response.rows.length ? new User(response.rows[0]) : null;
  }

  static async findById(id) {
    const response = await db.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1;
      `,
      [id]
    );

    return response.rows.length ? new User(response.rows[0]) : null;
  }

  static async updatePassword(userId, newPasswordHash) {
    const response = await db.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      RETURNING id, username, email, password_hash;
      `,
      [newPasswordHash, userId]
    );

    if (!response.rows.length) {
      throw new Error("User not found");
    }

    return new User(response.rows[0]);
  }

  static async deleteById(userId) {
    const response = await db.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING id, username, email;
      `,
      [userId]
    );

    if (!response.rows.length) {
      throw new Error("User not found");
    }

    return response.rows[0];
  }
}

module.exports = User;
