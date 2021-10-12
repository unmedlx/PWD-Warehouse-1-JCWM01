const express = require("express");
const { cartController } = require("../controllers/index");
const { authToken } = require("../helper/authToken");

const router = express.Router()

// router.get("/:id", addressController.getAddress);
router.post("/", authToken, cartController.getDataCart);


module.exports = router