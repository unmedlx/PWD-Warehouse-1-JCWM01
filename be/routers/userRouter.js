const express = require("express");
const { userController } = require("../controllers");
const { authToken } = require("../helper/authToken");

const router = express.Router();

//ROUTER METHOD
router.post("/register", userController.register);
router.patch("/verification", authToken, userController.verification);

module.exports = router;
