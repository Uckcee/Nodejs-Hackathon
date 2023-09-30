const express = require("express")
const router = express.Router()
const transactionController = require('../controller/transaction.ctrller')

router.post('/api/transfer/', transactionController.transfer)


module.exports = router;
