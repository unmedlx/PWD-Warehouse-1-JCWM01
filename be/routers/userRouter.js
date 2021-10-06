const express = require('express')
const { userController } = require('../controllers/index')
const routers = express.Router()

routers.get('/:id', userController.getUser)

//auth token dulu untuk cek apakah token masih aktif dan id sama dengan id di data
//jika tidak maka response gagal
routers.patch('/:id', userController.editData)

module.exports = routers