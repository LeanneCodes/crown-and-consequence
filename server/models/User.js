const db = require("../db/connect");
//Assuming table is called users
class User {
  constructor({user_id, user_name, password, progress }) {
    this.user_id = user_id
    this.user_name = user_name
    this.password = password
    this.progress = progress
  }

    static async getOneUser(userName) {
        const response = await db.query('SELECT user_name, progress FROM users WHERE LOWER(user_name) = LOWER($1);', [userName])
        if(response.rows.length !== 1) {
            throw new Error('Unable to find user: ' + userName)
        }
        return new User(response.rows[0])
    }

   static async create(data) { //This looks to see if the country exists, if it does it gives an error, if it doesn't then it will create one
    const {user_name, password} = data
    const existingUser = await db.query('SELECT user_name FROM users WHERE LOWER(user_name) = Lower($1);', [user_name])
    if(existingUser.rows.length === 0) {
        let response = await db.query('INSERT INTO users (user_name, password, progress) VALUES ($1, $2, 0) RETURNING *;', [user_name, password])
        return new User(response.rows[0])
    } else {
        throw new Error('A user with this name exists')
    }
    }

    async destroy() {
        let response = await db.query('DELETE FROM users WHERE user_name = $1 RETURNING *;', [this.user_name])
        return new User(response.rows[0])
    }

    async update(data) {
        const response = await db.query('UPDATE users SET password = $1 WHERE user_name = $2 RETURNING user_name, password;', [ data.password, this.user_name ]);
        if (response.rows.length != 1) {
            throw new Error('Unable to update password.')
        }
        return new User(response.rows[0]);
    }
}

module.exports = User

