const express = require("express");
const { checkoutController } = require("../controllers/index");
const router = express.Router()

router.post("/", checkoutController.addCheckout);

module.exports = router