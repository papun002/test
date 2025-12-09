const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();

// Read Aiven CA certificate
const caCert = fs.readFileSync("./ca.pem"); // path to downloaded certificate

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // make sure this is 17404 from your screenshot
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        ca: caCert,
      },
    },
  }
);

// Test connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully via Sequelize (Aiven)");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, connectDB };

