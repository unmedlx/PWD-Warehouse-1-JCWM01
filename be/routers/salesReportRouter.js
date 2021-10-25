const express = require("express");
const router = express.Router();
const { salesReportController } = require("../controllers");

router.get("/monthRevenue", salesReportController.getRevenueMonth);
router.get("/yearRevenue", salesReportController.getRevenueYear);
router.get("/dayRevenue", salesReportController.getRevenueDay);
router.get("/transactionStatus", salesReportController.getTransactionStatus);
router.get("/demographic", salesReportController.getDemographic);
router.get("/bestSelling", salesReportController.getBestSelling);
router.get("/currentRevenue", salesReportController.currentRevenue)

module.exports = router;
