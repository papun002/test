const VehicleModel = require("../../models/vehicles/vehicleModel");
const RouteModel = require("../../models/route/route.model");

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const {
      ownerName,
      registrationNo,
      chassicNo,
      engineNo,
      taxUpto,
      fitnessUpto,
      insuranceUpto,
      puccUpto,
    } = req.body;

    // vehicle already exists
    const existingVehicle = await VehicleModel.findOne({
      where: {
        vehicleNumber: registrationNo,
        isDeleted: false,
      },
    });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

    // Create new vehicle
    const newVehicle = await VehicleModel.create({
      ownerName,
      vehicleNumber: registrationNo,
      chassicNumber: chassicNo,
      engineNumber: engineNo,
      taxUpto,
      fitnessUpto,
      insuranceUpto,
      puccUpto,
      cid: req.cid,
    });
    res
      .status(201)
      .json({ newVehicle, message: "Vehicle created successfully" });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get All Vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleModel.findAll({
      where: { cid: req.cid, isDeleted: false },
    });
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete Vehicles
exports.deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.query;
    console.log(req);
    const vehicle = await VehicleModel.findOne({
      where: { id: vehicleId, cid: req.cid, isDeleted: false },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    // check if RouteName table vehicle is Present
    const routeName = await RouteModel.findOne({
      where: { defaultVehicle: vehicle.vehicleNumber, cid: req.cid, isDeleted: false },
    });
    if (routeName) {
      return res
        .status(400)
        .json({ message: `Vehicle is present in ${routeName.routeName}` });
    }
    vehicle.isDeleted = true;
    await vehicle.save();
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit Vehicles
exports.editVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.query;

    const vehicle = await VehicleModel.findOne({
      where: { id: vehicleId, cid: req.cid, isDeleted: false },
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const {
      ownerName,
      registrationNo,
      chassicNo,
      engineNo,
      taxUpto,
      fitnessUpto,
      insuranceUpto,
      puccUpto,
    } = req.body;

    // Check if another vehicle with the same registration number exists
    const existingVehicle = await VehicleModel.findOne({
      where: {
        vehicleNumber: registrationNo,
        cid: req.cid,
        isDeleted: false,
        id: { [require("sequelize").Op.ne]: vehicleId }, // Exclude the current vehicle
      },
    });

    if (existingVehicle) {
      return res.status(400).json({
        message: "Vehicle with this registration number already exists",
      });
    }

    vehicle.ownerName = ownerName;
    vehicle.vehicleNumber = registrationNo;
    vehicle.chassicNumber = chassicNo;
    vehicle.engineNumber = engineNo;
    vehicle.taxUpto = taxUpto;
    vehicle.fitnessUpto = fitnessUpto;
    vehicle.insuranceUpto = insuranceUpto;
    vehicle.puccUpto = puccUpto;

    await vehicle.save();
    res.status(200).json({ vehicle, message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
