const express = require("express");
const { transactionController } = require("../controllers/index");
const { deliveryRate } = require("../helper/deliveryRate")
const router = express.Router()

router.post("/", deliveryRate, transactionController.getDeliveryRate);

module.exports = router