const express = require('express')
const cors = require('cors')


const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json())

const { userRouter, uploaderRouter } = require('./routers/index')

app.use('/users', userRouter)
app.use('/profile', uploaderRouter)

app.listen(PORT, () => {
    console.log("API Running on ", PORT);
})