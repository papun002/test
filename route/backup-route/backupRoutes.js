const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getCid } = require("../../middleware/getCid-middlware/getCid");
const { createBackup, restoreBackup, getBackupHistory } = require("../../controllers/backup-controller/backupController");

// Multer config for uploads
const upload = multer({ dest: path.join(__dirname, "../../uploads/") });

// Routes
router.post("/create", getCid, createBackup);
router.post("/restore", upload.single("file"), getCid, restoreBackup);
router.get("/history", getCid, getBackupHistory);

module.exports = router;
