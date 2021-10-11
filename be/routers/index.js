const userRouter = require('./userRouter')
const uploaderRouter = require('./uploaderRouter')
const addressRouter = require('./adressRouter')
const cityProvinceRouter = require('./cityProvinceRouter')
const productsRouter = require('./productsRouter')

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
