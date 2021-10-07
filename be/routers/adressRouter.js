const express = require("express");
const { addressController } = require("../controllers/index");

const router = express.Router()

router.get("/:id", addressController.getAdress)


module.exports = router