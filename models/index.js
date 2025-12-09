const { FuelStationModel, FuelTransactionModel } = require("./fuel/fuel.model");

// 🔹 Define associations
FuelStationModel.hasMany(FuelTransactionModel, {
  foreignKey: "fuelStationId",
  as: "transactions",
});

FuelTransactionModel.belongsTo(FuelStationModel, {
  foreignKey: "fuelStationId",
  as: "fuelStation",
});

module.exports = {
  FuelStationModel,
  FuelTransactionModel,
};
