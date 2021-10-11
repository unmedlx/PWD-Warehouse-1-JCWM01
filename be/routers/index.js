const userRouter = require('./userRouter')
const uploaderRouter = require('./uploaderRouter')
const addressRouter = require('./adressRouter')
const cityProvinceRouter = require('./cityProvinceRouter')
const productsRouter = require('./productsRouter')
const adminStocksRouter = require('./adminStocksRouter')
const userStocksRouter = require('./userStocksRouter')
const warehousesRouter = require('./warehousesRouter')

module.exports = {
  productsRouter,
  userRouter,
  uploaderRouter,
  addressRouter,
  cityProvinceRouter,
  adminStocksRouter,
  userStocksRouter,
  warehousesRouter,
};
