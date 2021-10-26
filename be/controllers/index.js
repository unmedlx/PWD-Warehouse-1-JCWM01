const productsController = require("./productsController");
const userController = require("./userController");
const uploaderController = require("./uploaderController");
const addressController = require("./addressController");
const cityProvinceController = require("./cityProvinceController");
const adminStocksController = require("./adminStocksController");
const userStocksController = require("./userStocksController");
const warehousesController = require("./warehousesController");
const warehouseStockController = require("./warehouseStockController");
const cartController = require("./cartController");
const transactionController = require("./transactionController");
const checkoutController = require("./checkoutController");
const salesReportController = require("./salesReportController");

module.exports = {
  userStocksController,
  adminStocksController,
  productsController,
  userController,
  uploaderController,
  addressController,
  adminStocksController,
  userStocksController,
  cityProvinceController,
  warehousesController,
  warehouseStockController,
  cartController,
  transactionController,
  checkoutController,
  salesReportController,
};
