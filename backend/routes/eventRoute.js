const express = require('express');

const { getEvents, getUserEvents, getOneEvent, requestJoin, getEventHistories, getMyRequestEvent, updateStatusEvent } = require("../controllers/eventController")
const { middleware } = require("../middlewares/auth");

const router = express.Router();

router.get("/", middleware, getEvents);
router.get("/user/Events", middleware, getUserEvents);
router.route("/:eventId").get(middleware, getOneEvent);
router.route("/:eventId").post(middleware, requestJoin);
router.route("/:eventHistoryId").put(middleware, updateStatusEvent) ;
router.get("/request/all", middleware, getEventHistories);
router.get("/my/request", middleware, getMyRequestEvent);

module.exports = router;