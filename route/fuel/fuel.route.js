const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const {
  CreateFuelStation,
  getAllFuelStations,
  getFuelStationById,
  updateFuelStation,
  deleteFuelStation,
  getVehiclePutsFuelStation,
  CreateFuelTransaction,
  getAllFuelTransactions,
  getLatestFuelTransaction,
  getFuelDetailsSummaryOfFuelStation,
  // getUpdateDueCurrent,
  getUpdateDuePrevious,
  getRecentPreviousDue,
} = require("../../controllers/fuel-controller/Fuel.controller");

// Create a new route
router.post("/create/fuelstation", getCid, CreateFuelStation);
router.post("/create/fueltransaction", getCid, CreateFuelTransaction);
// router.post("/update/currentdueamountfuelstation", getCid, getUpdateDueCurrent);

router.get("/get/allfueltransactions", getCid, getAllFuelTransactions);
router.get("/get/latestfueltransaction", getCid, getLatestFuelTransaction);
router.get(
  "/get/fueldetailssummaryoffuelstation",
  getCid,
  getFuelDetailsSummaryOfFuelStation
);
router.get("/get/allfuelstations", getCid, getAllFuelStations);
router.get("/get/fuelstation/:id", getCid, getFuelStationById);
router.get("/get/vehicleputfuelStation", getCid, getVehiclePutsFuelStation);
router.get("/get/recentpreviousdue", getCid, getRecentPreviousDue);

router.put("/update/fuelstation", getCid, updateFuelStation);
router.put(
  "/update/fueltransaction/setpreviousdue",
  getCid,
  getUpdateDuePrevious
);

router.delete("/delete/fuelstation", getCid, deleteFuelStation);

module.exports = router;
