const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser());
app.use(bearerToken());
app.use(express.static("public"));

//Mengakses file picture dari backend public
//http://localhost:3001/images/IMG1633323280976.png
app.use(express.static("public"))

const { userRouter, uploaderRouter, addressRouter, productsRouter } = require('./routers/index')

app.use('/users', userRouter)
app.use('/profile', uploaderRouter)
app.use('/address', addressRouter)
app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
