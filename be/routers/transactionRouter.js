const express = require("express");
const { transactionController } = require("../controllers/index");
const { deliveryRate } = require("../helper/deliveryRate")
const { authToken } = require("../helper/authToken")
const router = express.Router()

router.post("/delivery-rate", deliveryRate, transactionController.getDeliveryRate);
router.post("/", transactionController.addTransaction);
router.get("/", transactionController.getTransaction);
router.get("/detail/:id", transactionController.getDetailTransaction);
router.patch('/upload', authToken, transactionController.uploadPaymentProof)


router.get("/admintransaction", transactionController.getUserTransaction)
router.patch("/admin-payment", transactionController.patchPaymentStatus)
router.get("/super-admin-transaction", transactionController.getUserTransactionSuper)


module.exports = router