const express = require("express");
const {
  createTaskAssign,
  getAllPendingTasksForAdmin,
  approveRejectTaskAssign,
  getTasksByStaffId,
} = require("../../controllers/taskAssign-controller/taskassign.controller");
const {
  getSidOfStaff,
} = require("../../middleware/getCid-middlware/getSidofStaff");
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const router = express.Router();

router.post("/create/taskassign", getSidOfStaff, createTaskAssign);
router.get("/get/taskassignbystaffid", getSidOfStaff, getTasksByStaffId);

// manager admin routes
router.get(
  "/get/manager/taskassign",
  getSidOfStaff,
  getAllPendingTasksForAdmin
);
router.put(
  "/update/manager/taskassign/status",
  getSidOfStaff,
  approveRejectTaskAssign
);

// owner admin routes
router.get("/get/taskassign", getCid, getAllPendingTasksForAdmin);
router.put("/update/taskassign/status", getCid, approveRejectTaskAssign);

module.exports = router;
