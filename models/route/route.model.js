const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../auth/signup");

const RouteModel = sequelize.define(
  "RouteModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defaultVehicle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Firm, // name of Target model
        key: "id", // key in Target model that we're referencing
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "routes",
  }
);

module.exports = RouteModel;