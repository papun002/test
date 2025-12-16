const BusworkModel = require("../../models/buswork/buswork.model");
const vehicleModel = require("../../models/vehicles/vehicleModel");
const staffModel = require("../../models/staff/staff.model");
const { where } = require("sequelize");

/**
 * ✅ Create Bus Work
 */
exports.createBuswork = async (req, res) => {
  try {
    const {
      vehicleId,
      conductorId,
      driverId,
      workDate,
      workDescription,
      amount,
    } = req.body;

    const buswork = await BusworkModel.create({
      vehicleId,
      conductorId,
      driverId,
      workDate,
      workDescription,
      amount: amount || 0,
      cid: req.cid,
    });

    res.status(201).json({
      success: true,
      message: "Bus work created successfully",
      data: buswork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating bus work",
      error: error.message,
    });
  }
};

/**
 * ✅ Get All Bus Works (Firm wise)
 */
exports.getAllBusworks = async (req, res) => {
  try {
    const busworks = await BusworkModel.findAll({
      where: { cid: req.cid, isDeleted: false },
      include: [
        {
          model: vehicleModel,
          attributes: ["id", "vehicleNumber"],
        },
        {
          model: staffModel,
          as: "driver",
          attributes: ["id", "nickName"], // 👈 driver name
        },
        {
          model: staffModel,
          as: "conductor",
          attributes: ["id", "nickName"], // 👈 conductor name
        },
      ],
      order: [["workDate", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: busworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bus works",
      error: error.message,
    });
  }
};

/** * ✅ Update Bus Work
 */

exports.updateBuswork = async (req, res) => {
  try {
    const { busworkId } = req.query;
    const {
      vehicleId,
      conductorId,
      driverId,
      workDate,
      workDescription,
      amount,
    } = req.body;

    const buswork = await BusworkModel.findByPk(busworkId);

    if (!buswork) {
      return res.status(404).json({
        success: false,
        message: "Bus work not found",
      });
    }

    await buswork.update({
      vehicleId,
      conductorId,
      driverId,
      workDate,
      workDescription,
      amount: amount || 0,
    });

    res.status(200).json({
      success: true,
      message: "Bus work updated successfully",
      data: buswork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating bus work",
      error: error.message,
    });
  }
};

/**
 * ✅ Delete Bus Work (Soft Delete)
 */
exports.deleteBuswork = async (req, res) => {
  try {
    const { busworkId } = req.query;
    const { role, cid } = req;

    // 🔒 Role-based authorization
    if (!["manager", "owner"].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Only manager or owner can delete bus work",
      });
    }

    const buswork = await BusworkModel.findOne({
      where: { id: busworkId, isDeleted: false, cid: cid },
    });

    if (!buswork) {
      return res.status(404).json({
        success: false,
        message: "Bus work not found",
      });
    }
    await buswork.update({ isDeleted: true });
    res.status(200).json({
      success: true,
      message: "Bus work deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting bus work",
      error: error.message,
    });
  }
};
