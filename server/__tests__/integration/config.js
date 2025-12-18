const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

// Load reset SQL
const resetSQL = fs.readFileSync(__dirname + "/reset.all.sql").toString();

// Reset function
const resetTestDB = async () => {
  try {
    const db = new Pool({
      connectionString: process.env.DB_TEST_URL,
    });

    await db.query(resetSQL);

    await db.end();

    console.log("C&C Test DB reset successfully");
  } catch (err) {
    console.error("Could not reset C&C TestDB:", err);
    throw err;
  }
};

module.exports = { resetTestDB };
