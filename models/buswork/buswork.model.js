const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../../models/auth/signup");
const staffModel = require("../staff/staff.model");
const vehicleModel = require("../vehicles/vehicleModel");

const BusworkModel = sequelize.define(
  "Buswork",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: vehicleModel,
        key: "id",
      },
    },
    conductorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: staffModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: staffModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    workDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    workDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "busworks",
  }
);

BusworkModel.belongsTo(staffModel, {
  foreignKey: "driverId",
  as: "driver",
});

BusworkModel.belongsTo(staffModel, {
  foreignKey: "conductorId",
  as: "conductor",
});

BusworkModel.belongsTo(vehicleModel, {
  foreignKey: "vehicleId",
});

BusworkModel.belongsTo(Firm, {
  foreignKey: "cid",
});



module.exports = BusworkModel;
