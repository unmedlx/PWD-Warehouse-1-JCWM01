const express = require("express");
const { addressController } = require("../controllers/index");

const router = express.Router()

router.get("/:id", addressController.getAdress)
router.patch("/:id", addressController.editAddress)


module.exports = router