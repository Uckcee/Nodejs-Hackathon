const express = require("express");
const router = express.Router();
const walletController = require('../controller/wallet.controller')
const authMiddleware = require("../middleware/auth.middleware").checkLoginToken;


router.post("/create/", [authMiddleware], walletController.createWallet);

router.get("/details/", [authMiddleware], walletController.getWalletDetails);

router.post("/update-balance/", [authMiddleware], walletController.updateBalance);





module.exports = router
