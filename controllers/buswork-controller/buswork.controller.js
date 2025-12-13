const BusworkModel = require("../../models/buswork/buswork.model");
const vehicleModel = require("../../models/vehicles/vehicleModel");
const staffModel = require("../../models/staff/staff.model");

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


 


