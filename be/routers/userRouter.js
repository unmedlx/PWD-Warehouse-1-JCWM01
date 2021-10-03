const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

//ROUTER METHOD
router.post("/register", userController.register);

module.exports = router;
