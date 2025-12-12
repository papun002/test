const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");

const routeController = require("../../controllers/route-controller/route.controller");
const {
  getSidOfStaff,
} = require("../../middleware/getCid-middlware/getSidofStaff");


const routeController = require("../../controllers/route-controller/route.controller");

// Create a new route
router.post("/create/route", getCid, routeController.createRoute);

// Get all routes
router.get("/get/routes", getCid, routeController.getRoutes);

// Delete a route
router.delete("/delete/route", getCid, routeController.deleteRoute);



// -----------------------------conductorModule--------------------------------
router.get("/get/staff/routes", getSidOfStaff, routeController.getRoutes);

module.exports = router;
