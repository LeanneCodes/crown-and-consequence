const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// One pool for all integration tests
const db = new Pool({
  connectionString: process.env.DB_TEST_URL,
});

// Run a specific reset SQL file
const resetTestDB = async (sqlFile) => {
  const sqlPath = path.join(__dirname, "sql", sqlFile);
  const sql = fs.readFileSync(sqlPath, "utf8");

  await db.query(sql);
};

module.exports = {
  db,
  resetTestDB,
};
