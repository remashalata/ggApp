const express = require('express');

const { getNotifications, readNotifications } = require("../controllers/notificationController")
const { middleware } = require("../middlewares/auth");

const router = express.Router();

router.get("/", middleware, getNotifications);
router.get("/read", middleware, readNotifications);

module.exports = router;