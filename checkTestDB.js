const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DB_TEST_URL,
});

async function checkTables() {
  try {
    const result = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

    console.log("📌 Tables in test DB:");
    console.table(result.rows);
  } catch (err) {
    console.error("❌ DB error:", err);
  } finally {
    db.end();
  }
}

checkTables();
