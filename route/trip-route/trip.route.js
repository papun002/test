const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const {
  CreateTripDetails,
  FetchTripDetails,
  FetchTripDetailsLatestThree,
  FetchTripsByDate,
  FetchTripsByMonth,
  FetchTripMonthlySummary,
  RecentDateOfTripsByRouteId,
  deleteTrips,
  CancelTrips,
  getTripsStaff,
  getTripsByConductorId,
  createTripByStaffId,
  deleteTripsStaff,
  FetchTripDetailsByManager,
  FetchTripDetailsByManagerCustomDate,
  updateTripByStaffId,
  updateTripByOwner,
} = require("../../controllers/trip-controller/fleet-trip-details/fleet-trip-details.controller");

const {
  getSidOfStaff,
} = require("../../middleware/getCid-middlware/getSidofStaff");

// Create a new trip details
router.post("/create/trip-details", getCid, CreateTripDetails);
router.post("/canceltrip", getCid, CancelTrips)

router.get("/get/tripdetails", getCid, FetchTripDetails);
router.get("/get/tripdetailsLatestThree", getCid, FetchTripDetailsLatestThree);
router.get("/get/tripdetailsbydate", getCid, FetchTripsByDate);
router.get("/get/tripdetailsbymonth", getCid, FetchTripsByMonth);
router.get("/get/monthlysummarytarget", getCid, FetchTripMonthlySummary);
router.get(
  "/get/recentDateOfTripsByRouteId",
  getCid,
  RecentDateOfTripsByRouteId
);
router.get("/get/stafffortrips", getCid, getTripsStaff)

router.delete("/delete/trip", getCid, deleteTrips);
router.put("/update/trip", getCid, updateTripByOwner);


// --------------------------------------CONDUCTOR MODULE---------------------------------------------------------------------
router.get("/get/tripsbyconductorid", getSidOfStaff, getTripsByConductorId);
router.post("/create/tripbyconductorid", getSidOfStaff, createTripByStaffId);
router.delete("/delete/staff/trip", getSidOfStaff, deleteTripsStaff);
router.put("/update/staff/trip", getSidOfStaff, updateTripByStaffId);




// -----------------------------------MANAGER MODULE-------------------------------------------------------------
router.get("/get/manager/tripdetailsbymanager", getSidOfStaff, FetchTripDetailsByManager);
router.get("/get/manager/tripdetailsbymanagerbydate", getSidOfStaff, FetchTripDetailsByManagerCustomDate);

module.exports = router;




