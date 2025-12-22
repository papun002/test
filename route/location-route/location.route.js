const express = require("express");
const router = express.Router();
const locationController = require("../../controllers/location-controller/location.controller");
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const { getSidOfStaff } = require("../../middleware/getCid-middlware/getSidofStaff");

// Update location
router.post("/update", getSidOfStaff, locationController.updateLocation);

// Get location
router.get("/get", getCid, locationController.getLocation);

module.exports = router;
