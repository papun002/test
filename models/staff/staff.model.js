const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../auth/signup");
const staffModel = sequelize.define(
  "staffModel",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    nickName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    cid: {
      type: DataTypes.INTEGER,
      references: {
        model: Firm,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    password: { type: DataTypes.STRING, allowNull: true },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true, tableName: "staffmodel" }
);
module.exports = staffModel;
