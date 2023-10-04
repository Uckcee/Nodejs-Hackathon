const express = require("express")
const router = express.Router()
const transactionController = require('../controller/transaction.ctrller')
const authMiddleware = require('../middleware/auth.middleware').checkLoginToken


router.post("/transaction/", [authMiddleware], transactionController.createTransaction);

router.get("/transaction-history/", [authMiddleware], transactionController.getTransactionHistory);


module.exports = router
