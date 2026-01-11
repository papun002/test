const RouteModel = require("../../models/route/route.model");
const VehicleModel = require("../../models/vehicles/vehicleModel");
const TripModel = require("../../models/trip/fleet-trip-details/Fleet-trip.model");
const StaffModel = require("../../models/staff/staff.model");
const { FuelTransactionModel } = require("../../models/fuel/fuel.model");



const models = [
  { name: "Vehicle", model: VehicleModel },
  { name: "Route", model: RouteModel },
  { name: "Trip", model: TripModel },
  { name: "Staff", model: StaffModel },
  { name: "FuelPayment", model: FuelTransactionModel },
];

// GET all deleted data
exports.getDeletedData = async (req, res) => {
  try {
    const deletedData = {};

    for (const m of models) {
      const data = await m.model.findAll({
        where: { IsDeleted: true, cid: req.cid },
        raw: true,
      });
      deletedData[m.name] = data;
    }

    res.status(200).json({ success: true, data: deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// RESTORE a deleted row
exports.restoreData = async (req, res) => {
  try {
    const { modelName, id } = req.params;

    const modelObj = models.find((m) => m.name === modelName);
    if (!modelObj) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid model name" });
    }

    const record = await modelObj.model.findOne({
      where: { id, isDeleted: true, cid: req.cid },
    });
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    record.isDeleted = false;
    await record.save();

    res
      .status(200)
      .json({ success: true, message: `${modelName} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.permanentlyDelete = async (req, res) => {
  try {
    const { modelName, id } = req.params;

    // Find model definition
    const modelObj = models.find((m) => m.name === modelName);
    if (!modelObj) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid model name" });
    }

    // Delete permanently only if isDeleted = true
    const deletedRecord = await modelObj.model.destroy({
      where: { id, isDeleted: true, cid: req.cid },
    });

    if (deletedRecord === 0) {
      return res.status(404).json({
        success: false,
        message: "Record not found or not soft-deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${modelName} record permanently deleted successfully`,
    });
  } catch (error) {
    console.error("Error permanently deleting record:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
