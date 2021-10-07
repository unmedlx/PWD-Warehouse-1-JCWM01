const express = require("express");
const { addressRouter } = require(".");
const { addressController } = require("../controllers/index");
const { getCoor } = require('../helper/getCoordinate')

const router = express.Router()

router.get("/:id", addressController.getAdress)
router.patch("/:id", addressController.editAddress)
router.post("/", getCoor, addressController.addAddress)
router.delete("/:idAddress", addressController.deleteAddress)


module.exports = router