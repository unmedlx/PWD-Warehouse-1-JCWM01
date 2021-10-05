const express = require('express')
const { userController } = require('../controllers/index')
const routers = express.Router()

routers.patch('/setting', userController.editData)

module.exports = routers