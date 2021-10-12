const express = require("express");
const router = express.Router();
const { warehousesController } = require("../controllers");

router.get("/", warehousesController.getData);
router.get("/warehouseList", warehousesController.getWarehouseList);
router.get("/warehouseData", warehousesController.getWarehouseData);
router.get("/:idProduct", warehousesController.getDataById);
router.post("/", warehousesController.addData);
router.patch("/:idProduct", warehousesController.editData);
router.delete("/:idProduct", warehousesController.deleteData);

module.exports = router;
