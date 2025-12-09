const express = require("express");
const router = express.Router();
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const staffController = require("../../controllers/saff-controller/staff.controller");

// Create a new staff member (driver or conductor)
router.post("/create/staff", getCid, staffController.createStaff);
router.get("/get/staff", getCid, staffController.getStaff);
router.delete("/delete/staff", getCid, staffController.deleteStaff);
router.put("/update/staff", getCid, staffController.updateStaff);
router.put("/active/staff", getCid, staffController.activeStaff);






module.exports = router;