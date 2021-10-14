const productsController = require("./productsController");
const userController = require("./userController");
const uploaderController = require("./uploaderController");
const addressController = require("./addressController");
const cityProvinceController = require("./cityProvinceController");
const adminStocksController = require("./adminStocksController");
const userStocksController = require("./userStocksController");
const warehousesController = require("./warehousesController");
const cartController = require("./cartController");

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
  cartController,
};
