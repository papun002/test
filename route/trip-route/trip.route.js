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
  createTripByConductorId,
  deleteTripsStaff,
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
router.get("/get/stafffortrips",getCid,getTripsStaff)

router.delete("/delete/trip", getCid, deleteTrips);


// --------------------------------------CONDUCTOR MODULE---------------------------------------------------------------------
router.get("/get/tripsbyconductorid", getSidOfStaff, getTripsByConductorId);
router.post("/create/tripbyconductorid", getSidOfStaff,createTripByConductorId);
router.delete("/delete/staff/trip", getSidOfStaff, deleteTripsStaff);

module.exports = router;




