const express = require("express")
const router = express.Router()
const { productsController } = require("../controller")

router.get("/", productsController.getData)
router.get("/:idProduct", productsController.getDataById)
router.post("/", productsController.addData)
router.patch("/:idProduct", productsController.editData)
router.delete("/:idProduct", productsController.deleteData)

module.exports = router
