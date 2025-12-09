const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../../models/auth/signup");

const BackupHistory = sequelize.define("BackupHistory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Completed", "Failed"),
    defaultValue: "Completed",
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Firm,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  }
},
{
  tableName:"backuphistories",
  timestamps: true
}
);

module.exports = BackupHistory;

