const { createClient } = require('@libsql/client');

let client = null;

const connectDB = async () => {
  try {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    console.log('Turso libSQL Client initialized successfully.');
    return client;
  } catch (error) {
    console.error(`Error connecting to Turso Database: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
};

module.exports = connectDB;
module.exports.getDB = getDB;
