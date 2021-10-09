const express = require("express");
const router = express.Router();
const { adminStocksController } = require("../controllers");

router.get("/", adminStocksController.getData);
router.get("/:idProduct", adminStocksController.getDataById);
router.post("/", adminStocksController.addData);
router.patch("/:idProduct", adminStocksController.editData);
router.delete("/:idProduct", adminStocksController.deleteData);

module.exports = router;
