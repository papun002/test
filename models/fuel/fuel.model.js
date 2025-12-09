const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../../models/auth/signup");

const FuelStationModel = sequelize.define(
  "FuelStation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FuelStationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    busRouteIds: {
      type: DataTypes.JSON,
      allowNull: true, // optional
      comment: "Stores route names as JSON for quick lookup",
      defaultValue: [],
      get() {
        // Ensure always returns an array of strings
        const raw = this.getDataValue("busRouteIds") || [];
        return raw.map(String);
      },
      set(value) {
        // Store all IDs as strings
        this.setDataValue(
          "busRouteIds",
          Array.isArray(value) ? value.map(String) : []
        );
      },
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
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "fuelstations",
    timestamps: true,
  }
);

const FuelTransactionModel = sequelize.define(
  "FuelTransaction",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fuelStationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FuelStationModel,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    amountPaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    previosDue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fromDatePreviousDue: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    toDatePreviousDue: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    currentDue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalDue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "fueltransactions",
    timestamps: true,

    // ✅ Hook will trigger before both CREATE and UPDATE
    hooks: {
      beforeSave: (transaction) => {
        const prev = parseFloat(transaction.previosDue || 0);
        const current = parseFloat(transaction.currentDue || 0);
        transaction.totalDue = prev + current;
      },
      beforeUpdate: (transaction) => {
        const prev = parseFloat(transaction.previosDue || 0);
        const current = parseFloat(transaction.currentDue || 0);
        transaction.totalDue = prev + current;
      },
    },
  }
);

// Define Associations
FuelTransactionModel.belongsTo(FuelStationModel, {
  foreignKey: "fuelStationId",
  as: "FuelStation",
});

FuelStationModel.hasMany(FuelTransactionModel, {
  foreignKey: "fuelStationId",
  as: "Transactions",
});

module.exports = { FuelStationModel, FuelTransactionModel };
