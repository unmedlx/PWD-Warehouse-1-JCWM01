const express = require("express");
const router = express.Router();
const { userStocksController } = require("../controllers");
const { userStockCheck } = require("../helper/userStockCheck");

router.get("/", userStocksController.getData);
router.get("/:idProduct", userStocksController.getDataById);
router.post("/", userStocksController.addData);
router.patch("/:idProduct", userStocksController.editData);
router.delete("/:idProduct", userStocksController.deleteData);
router.patch("/", userStockCheck, userStocksController.editUserStock);

module.exports = router;
