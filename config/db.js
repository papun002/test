const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

// Read Aiven CA certificate
const caCert = fs.readFileSync(__dirname + "/ca.pem"); 

// Create Sequelize instance
const sequelize = new Sequelize(
  "busdb",
  "avnadmin",
  "AVNS_FdIV_dEMHqP-_Rn7vif",
  {
    host: "mysql-118e19e7-ranarahul87076-812e.c.aivencloud.com",
    port: "17400", // make sure this is 17404 from your screenshot
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




