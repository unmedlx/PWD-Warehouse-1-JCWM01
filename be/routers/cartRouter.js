const express = require("express");
const { cartController } = require("../controllers/index");
const { authToken } = require("../helper/authToken");

const router = express.Router();

// router.get("/:id", addressController.getAddress);
router.get("/", cartController.getData);
router.get("/:idProduct", cartController.getDataById);
router.post("/", authToken, cartController.getDataCart);
router.post("/", cartController.addData);
router.patch("/:idProduct", cartController.editData);
router.delete("/", cartController.deleteDataCart);
router.delete("/:idProduct", cartController.deleteData);

module.exports = router;
