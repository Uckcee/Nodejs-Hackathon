const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("api/userroute", userController.getUserRoute);
router.post("api/userroute", userController.postUserroute);

module.exports = router
