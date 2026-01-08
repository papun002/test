const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../../models/auth/signup");
const FuelStationModel = require("../../models/fuel/fuel.model");

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
      references: { model: Firm, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    fuelStationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: FuelStationModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    fixedFasttag: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    fixedFuel: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    fixedStaff: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    coolieFeild: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    standFeild: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    staffFeild: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    fastTagFeild: {
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
