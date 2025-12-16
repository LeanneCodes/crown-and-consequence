const db = require("../db/connect");

class User {
  constructor({ id, username, email, password_hash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
  }

  static async create({ username, email, password_hash }) {     // Create a new user
    const response = await db.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [username, email, password_hash]
    );

    return new User(response.rows[0]);
  }

  static async findByEmail(email) {     // Find a user by email (used for login)
    const response = await db.query(
      `
      SELECT * FROM users
      WHERE email = $1;
      `,
      [email]
    );

    if (response.rows.length === 0) return null;

    return new User(response.rows[0]);
  }

  static async findById(id) {   // Find a user by ID (used for auth, progress, ownership checks)
    const response = await db.query(
      `
      SELECT * FROM users
      WHERE id = $1;
      `,
      [id]
    );

    if (response.rows.length === 0) return null;

    return new User(response.rows[0]);
  }

  static async updatePassword(userId, newPasswordHash) {   // Update a user's password (hashing done in controller)
    const response = await db.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      RETURNING *;
      `,
      [newPasswordHash, userId]
    );

    if (response.rows.length === 0) {
      throw new Error("User not found");
    }

    return new User(response.rows[0]);
  }

  static async deleteById(userId) {     // Delete a user account
    const response = await db.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `,
      [userId]
    );

    if (response.rows.length === 0) {
      throw new Error("User not found");
    }

    return new User(response.rows[0]);
  }
}

module.exports = User;
