const express = require("express");
const router = express.Router();
const recycleBinController = require("../../controllers/recycle-controller/recycle.controller");
const {getCid} = require("../../middleware/getCid-middlware/getCid");

// Get all deleted data
router.get("/getalldeleteditems", getCid, recycleBinController.getDeletedData);

// Restore a deleted record
router.patch("/:modelName/:id/restore", getCid ,recycleBinController.restoreData);

// Permanently delete a record
router.delete("/permanentlydelete/:modelName/:id", getCid ,recycleBinController.permanentlyDelete);

module.exports = router;
