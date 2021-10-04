//IMPORT
const express = require("express");
const app = express();
const cors = require("cors"); //give access
const PORT = 6000;
const bearerToken = require("express-bearer-token"); //read header from frontend

// ROUTERS
const { userRouter } = require("./routers/index");

// USING API
app.use(cors());
app.use(express.json()); //body-parser
app.use(bearerToken()); //Bearer-Token

//USE ROUTER
app.use("/users", userRouter);

// Launch API
app.listen(PORT, () => console.log("Warehouse1 Api Running on Port", PORT));
