const express = require("express");
const router = express.Router();
const { productsController } = require("../controllers");

router.get("/", productsController.getData);
router.get("/:idProduct", productsController.getDataById);
router.post("/", productsController.addData);
router.patch("/noImage/:idProduct", productsController.editDataNoImage);
router.patch("/:idProduct", productsController.editData);
router.delete("/:idProduct", productsController.deleteData);

module.exports = router;
