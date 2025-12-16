const db = require("../db/connect");

class User {
  constructor({ user_id, username, email, password, is_admin }) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.is_admin = is_admin
  }

  static async create(data) {  
       // Create a new user
       const {username, email, password, isAdmin} = data;
    let response = await db.query('INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING user_id;',
      [username, email, password]);
 const newId = response.rows[0].user_id;
        const newUser = await User.findById(newId);
        return newUser;
  }

  static async findByUsername(username) {     // Find a user by email (used for login)
    const response = await db.query('SELECT * FROM "user" WHERE username = $1;',
      [username]
    );

    if (response.rows.length === 0) return null;

    return new User(response.rows[0]);
  }

  static async findById(user_id) {   // Find a user by ID (used for auth, progress, ownership checks)
    const response = await db.query('SELECT * FROM "user" WHERE user_id = $1', [user_id]);
    if (response.rows.length === 0) {
            throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async updatePassword(username, password) {   // Update a user's password (hashing done in controller)
    const response = await db.query(
      `UPDATE "user"
      SET password = $1
      WHERE username = $2
      RETURNING *;
      `,
      [password, username]
    );

    if (response.rows.length === 0) {
      throw new Error("User not found");
    }

    return new User(response.rows[0]);
  }

  static async deleteByUsername(username) {     // Delete a user account
    const response = await db.query(
      `
      DELETE FROM "user"
      WHERE username = $1
      RETURNING *;
      `,
      [username]
    );

    if (response.rows.length === 0) {
      throw new Error("User not found");
    }

    return "User successfully deleted";
  }
}

module.exports = User;
