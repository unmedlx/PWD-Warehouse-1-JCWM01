const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { productsRouter } = require("./router")
const PORT = 3001

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser())

app.use("/products", productsRouter)

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`)
})
