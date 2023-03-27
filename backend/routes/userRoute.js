const express = require('express');

const { signin, signup, getUsers, profile } = require("../controllers/userController")
const { middleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", middleware, getUsers);
router.put("/profile", middleware, profile);

module.exports = router;