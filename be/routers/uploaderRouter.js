const express = require('express')
const { uploaderController } = require('../controllers/index')
const route = express.Router()

route.patch('/upload', uploaderController.uploadImage)

module.exports = route
