const express = require("express");
const { cityProvinceController } = require("../controllers/index");

const router = express.Router()

router.get("/province", cityProvinceController.getProvince);
router.get("/city", cityProvinceController.getCity);




module.exports = router