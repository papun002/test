const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const {
  getFleetTripMetrics,
  getRecentPayments,
} = require("../../controllers/dashboard/dashboard.controller");

router.get("/metrics", getCid, getFleetTripMetrics);
router.get("/recent/payments", getCid, getRecentPayments);

module.exports = router;
