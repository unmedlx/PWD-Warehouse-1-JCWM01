const express = require("express");
const { addressController } = require("../controllers/index");
const { authToken } = require("../helper/authToken");
const { getCoor } = require('../helper/getCoordinate');

const router = express.Router()

router.get("/:id", addressController.getAddress);
router.post("/", authToken, addressController.getDataAddress);
router.patch("/:id", getCoor, addressController.editAddress);
router.post("/addAddress", getCoor, addressController.addAddress);
router.delete("/:idAddress", addressController.deleteAddress);


module.exports = router