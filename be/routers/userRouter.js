const express = require("express");
const { userController } = require("../controllers");
const { authToken } = require("../helper/authToken");
const { authTokenF } = require("../helper/forgotPassword/authTokenF");

const router = express.Router();

//ROUTER METHOD
router.post("/register", userController.register);
router.patch("/verification", authToken, userController.verification);
router.post("/login", userController.login);

router.patch("/", authToken, userController.getDataUser);
router.patch("/tes", authToken, userController.editDataUser);

router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", authTokenF, userController.verificationF);

module.exports = router;
