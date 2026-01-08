const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Firm = require("../../auth/signup");
const FuelStationModel = require("../../fuel/fuel.model");

const staffModel = require("../../staff/staff.model");
const RouteModel = require("../../route/route.model");

const FleetTripModel = sequelize.define(
  "FleetTripDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: RouteModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    busNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upTripSale: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    downTripSale: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    luggage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalSale: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    mainFuel: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    coolie: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    fixedFuel: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    staff: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    fastTagTollAmt: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    partsAccessories: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    mistriWorks: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    busWorks: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    stand: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    otherExp: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalExpenditures: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: staffModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    conductorId: {
      type: DataTypes.INTEGER,
      references: {
        model: staffModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    luggageAddWithTotalSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mainFuelSameAsFixedFuel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isCancel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fuelStationId: {
      type: DataTypes.INTEGER,
      references: {
        model: FuelStationModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      defaultValue: 0
    }
  },
  {
    tableName: "tripfleetdetails",
    timestamps: true,
  }
);

FleetTripModel.belongsTo(staffModel, { as: "driver", foreignKey: "driverId" });
FleetTripModel.belongsTo(staffModel, { as: "conductor", foreignKey: "conductorId" });

FleetTripModel.belongsTo(RouteModel, { as: "route", foreignKey: "routeId" });
RouteModel.hasMany(FleetTripModel, { as: "trips", foreignKey: "routeId" });

module.exports = FleetTripModel;
