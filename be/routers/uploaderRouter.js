const express = require('express')
const { uploaderController } = require('../controllers/index')
const { authToken } = require("../helper/authToken");
const route = express.Router()

route.patch('/:id', authToken, uploaderController.uploadImage)

module.exports = route
