const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../auth/signup");

const VehicleModel = sequelize.define(
  "VehicleModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    chassicNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    engineNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    taxUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    borderTaxUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fitnessUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    insuranceUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    puccUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Firm, // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "vehiclemodels",
    timestamps: true,
  }
);

module.exports = VehicleModel;
