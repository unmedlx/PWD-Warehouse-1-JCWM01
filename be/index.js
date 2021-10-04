//IMPORT
const express = require("express");
const app = express();
const cors = require("cors"); //give access
const PORT = 3001;
const bearerToken = require("express-bearer-token"); //read header from frontend

// USING API
app.use(cors());
app.use(express.json()); //body-parser
app.use(bearerToken()); //Bearer-Token

// ROUTERS
const { userRouter } = require("./routers/index");

//USE ROUTER
app.use("/users", userRouter);

// Launch API
app.listen(PORT, () => console.log("Warehouse1 Api Running on Port", PORT));
