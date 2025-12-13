const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const {
  getSidOfStaff,
} = require("../../middleware/getCid-middlware/getSidofStaff");
const {
  createBuswork,
  getAllBusworks,
} = require("../../controllers/buswork-controller/buswork.controller");


router.post("/create/buswork", getSidOfStaff, createBuswork);

router.get("/get/allbuswork", getSidOfStaff, getAllBusworks);

module.exports = router;
