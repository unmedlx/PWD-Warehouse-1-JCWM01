const userRouter = require("./userRouter");
const uploaderRouter = require("./uploaderRouter");
const addressRouter = require("./adressRouter");
const cityProvinceRouter = require("./cityProvinceRouter");
const productsRouter = require("./productsRouter");
const adminStocksRouter = require("./adminStocksRouter");
const userStocksRouter = require("./userStocksRouter");
const warehousesRouter = require("./warehousesRouter");
const cartRouter = require("./cartRouter");
const transactionRouter = require("./transactionRouter");
const checkoutRouter = require("./checkoutRouter");
const salesReportRouter = require("./salesReportRouter");

module.exports = {
  productsRouter,
  userRouter,
  uploaderRouter,
  addressRouter,
  cityProvinceRouter,
  adminStocksRouter,
  userStocksRouter,
  warehousesRouter,
  cartRouter,
  transactionRouter,
  checkoutRouter,
  salesReportRouter,
};
