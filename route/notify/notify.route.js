const express = require("express");
const router = express.Router();
const {getCid} = require("../../middleware/getCid-middlware/getCid");
const { getAllNotifications } = require("../../controllers/notification-controller/notify.controller");


router.get("/get/notify", getCid, getAllNotifications)



module.exports = router;