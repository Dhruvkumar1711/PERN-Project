const { query } = require('../models/connection.js');

const initDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL UNIQUE,
    name VARCHAR(255) NOT NULL,
    registration_no VARCHAR(10) PRIMARY KEY CHECK (LENGTH(registration_no) = 10),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8),
    age INTEGER CHECK (age BETWEEN 16 AND 65)
   );
  `;

  try {
    await query(createTableQuery);
    console.log("Table is created Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  initDatabase,
};