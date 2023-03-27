const express = require('express');

const { createPlace, removePlace } = require("../controllers/placeController")
const { middleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/", middleware, createPlace);
router.delete("/:placeId", middleware, removePlace);

module.exports = router;