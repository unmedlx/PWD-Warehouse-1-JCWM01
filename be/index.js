const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001
const bearerToken = require("express-bearer-token"); //read header from frontend

app.use(cors())
app.use(express.json())
app.use(bearerToken()); //Bearer-Token

//Mengakses file picture dari backend public
//http://localhost:3001/images/IMG1633323280976.png
app.use(express.static("public"))

const { userRouter, uploaderRouter } = require('./routers/index')

app.use('/users', userRouter)
app.use('/profile', uploaderRouter)

app.listen(PORT, () => {
    console.log("API Running on ", PORT);
})
