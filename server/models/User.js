const db = require("../db/connect");

class User {
  constructor({ id, username, email, password}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async create(data) {  
       // Create a new user
       const {username, email, password} = data;
    let response = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;',
      [username, email, password]);
 const newId = response.rows[0].id;
        const newUser = await User.findById(newId);
        return newUser;
  }

  static async findByUsername(username) {     // Find a user by email (used for login)
    const response = await db.query('SELECT * FROM users WHERE username = $1;',
      [username]
    );

    return response.rows.length ? new User(response.rows[0]) : null;
  }

  static async findById(id) {   // Find a user by ID (used for auth, progress, ownership checks)
    const response = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (response.rows.length === 0) {
            throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async updatePassword(username, password) {   // Update a user's password (hashing done in controller)
    const response = await db.query(
      `UPDATE users
      SET password = $1
      WHERE username = $2
      RETURNING *;
      `,
      [password, username]
    );

    if (!response.rows.length) {
      throw new Error("User not found");
    }

    return new User(response.rows[0]);
  }

  static async deleteByUsername(username) {     // Delete a user account
    const response = await db.query(
      `
      DELETE FROM users
      WHERE username = $1
      RETURNING *;
      `,
      [username]
    );

    if (!response.rows.length) {
      throw new Error("User not found");
    }

    return "User successfully deleted";
  }
}

module.exports = User;
