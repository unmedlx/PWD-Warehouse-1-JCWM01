const express = require("express");
const { checkoutController } = require("../controllers/index");
const router = express.Router()

router.post("/", checkoutController.addCheckout);
router.get("/:id", checkoutController.getCheckout);

module.exports = router