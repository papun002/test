const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const {
  getSidOfStaff,
} = require("../../middleware/getCid-middlware/getSidofStaff");
const {
  createBuswork,
  getAllBusworks,
  deleteBuswork,
  updateBuswork,
} = require("../../controllers/buswork-controller/buswork.controller");

router.post("/create/buswork", getSidOfStaff, createBuswork);
router.get("/get/allbuswork", getSidOfStaff, getAllBusworks);
router.put("/update/buswork", getSidOfStaff, updateBuswork);


// for managerial delete
router.delete("/delete/manager/buswork", getSidOfStaff, deleteBuswork);
router.delete("/delete/buswork", getCid, deleteBuswork);
module.exports = router;
