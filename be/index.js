const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  productsRouter,
  userRouter,
  uploaderRouter,
  adminStocksRouter,
  userStocksRouter,
  warehousesRouter,
} = require("./routers");
const bearerToken = require("express-bearer-token");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser());
app.use(bearerToken());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/profile", uploaderRouter);
app.use("/adminstocks", adminStocksRouter);
app.use("/userstocks", userStocksRouter);
app.use("/warehouses", warehousesRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
