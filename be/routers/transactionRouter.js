const express = require("express");
const { transactionController } = require("../controllers/index");
const { deliveryRate } = require("../helper/deliveryRate")
const router = express.Router()

router.post("/delivery-rate", deliveryRate, transactionController.getDeliveryRate);
router.post("/", transactionController.addTransaction);

module.exports = router