const express = require("express");
const router = express.Router();
const { cartController } = require("../controllers");

router.get("/", cartController.getData);
router.get("/:idProduct", cartController.getDataById);
router.post("/", cartController.addData);
router.patch("/:idProduct", cartController.editData);
router.delete("/:idProduct", cartController.deleteData);

module.exports = router;
