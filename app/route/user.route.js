const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware').checkLoginToken

// users routes
router.post("/api/users/login/", authController.Login)
router.post("/api/users/register/", authController.Register);


router.get("/api/userroute/",[authMiddleware], userController.getUserRoutes);

router.get("/api/userroute/:id/", [authMiddleware], userController.getOneUser);

router.post("/api/userroute/", [authMiddleware], userController.postUserRoute);

module.exports = router;
