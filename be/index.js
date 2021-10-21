const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv").config();
const {
  productsRouter,
  userRouter,
  uploaderRouter,
  adminStocksRouter,
  userStocksRouter,
  addressRouter,
  cityProvinceRouter,
  warehousesRouter,
  warehouseStockRouter,
  cartRouter,
  transactionRouter,
  checkoutRouter,
  salesReportRouter,
} = require("./routers");
const bearerToken = require("express-bearer-token");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bearerToken());
app.use(express.static("public"));

//Mengakses file picture dari backend public
//http://localhost:3001/images/IMG1633323280976.png
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/profile", uploaderRouter);
app.use("/cityprovince", cityProvinceRouter);
app.use("/address", addressRouter);
app.use("/products", productsRouter);
app.use("/adminstocks", adminStocksRouter);
app.use("/userstocks", userStocksRouter);
app.use("/warehouses", warehousesRouter);
app.use("/wh-stocks", warehouseStockRouter);
app.use("/cart", cartRouter);
app.use("/transaction", transactionRouter);
app.use("/checkout", checkoutRouter);
app.use("/carts", cartRouter);
app.use("/salesReport", salesReportRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
