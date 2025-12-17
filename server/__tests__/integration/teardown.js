//This way we can use the same pool for all the tests, and then close it once we're done, rather than open and close for each one
const { db } = require("./config");

module.exports = async () => {
  await db.end();
};
