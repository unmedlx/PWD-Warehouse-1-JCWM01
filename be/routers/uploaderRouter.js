const express = require('express')
const { uploaderController } = require('../controllers/index')
const { auth } = require('../helper/authTokenwannabe')
const route = express.Router()

route.patch('/upload', auth, uploaderController.uploadImage)

module.exports = route
