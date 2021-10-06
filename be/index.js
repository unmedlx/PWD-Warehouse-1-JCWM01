const express = require("express");
const cors = require("cors");
const { productsRouter, userRouter } = require("./routers");
const bearerToken = require("express-bearer-token");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.use("/users", userRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
