const express = require("express");
const { addressController } = require("../controllers/index");
const { getCoor } = require('../helper/getCoordinate')

const router = express.Router()

router.get("/:id", addressController.getAdress)
router.patch("/:id", addressController.editAddress)
router.post("/", getCoor, addressController.addAddress)


module.exports = router