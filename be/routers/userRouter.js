const express = require('express')
const { userController } = require('../controllers/index')
const routers = express.Router()

routers.get('/get', userController.get)

module.exports = routers