const express = require("express");
const router = express.Router();
const vehicleController = require("../../controllers/vehicle-controller/vehicle.controller");
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const { getSidOfStaff } = require("../../middleware/getCid-middlware/getSidofStaff");

// Create a new vehicle
router.post("/create/vehicle", getCid, vehicleController.createVehicle);

// Get all vehicles for a specific company
router.get("/get/vehicles", getCid, vehicleController.getVehicles);

// Delete a vehicle
router.delete("/delete/vehicle", getCid, vehicleController.deleteVehicle);

// Edit a vehicle
router.put("/edit/vehicle", getCid, vehicleController.editVehicle);

//------------------------------------------------- conductor module --------------------------------------------
router.get("/get/staff/vehicles", getSidOfStaff, vehicleController.getVehicles);

module.exports = router;

