const express = require("express");
const router = express.Router();
const { warehouseStockController} = require("../controllers")

router.get("/", warehouseStockController.getData)
router.post("/request", warehouseStockController.requestStock );
router.post("/accept", warehouseStockController.acceptRequest);

module.exports = router;