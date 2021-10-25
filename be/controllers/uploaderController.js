const { db } = require('../database/index')
const { uploader } = require('../helper/uploader')
const fs = require('fs')


module.exports = ({
    uploadImage: (req, res) => {
        if (req.params.id == req.user.idUser) {
            try {
                let path = '/images'
                const upload = uploader(path, 'IMG').fields([{ name: 'file' }])

                upload(req, res, (error) => {
                    if (error) {
                        res.status(500).send(error)
                    }

                    const { file } = req.files
                    const filepath = file ? path + '/' + file[0].filename : null


                    let data = JSON.parse(req.body.data)
                    data.userImage = filepath //dari FE tidak ada path yang dikirim maka untuk masukin path ke database kita tambahkan ke object data dengan data.image (image sesuai dengan db)

                    let sqlGetOldProfile = `SELECT userImage FROM users WHERE idUser = ${db.escape(data.idUser)}`
                    db.query(sqlGetOldProfile, (err, results) => {
                        if (results[0].userImage != '/images/profile-default.png') {
                            fs.unlinkSync('./public' + results[0].userImage)
                        } else {
                        }
                    })


                    let sqlInsert = `UPDATE users SET userImage =${db.escape(data.userImage)} WHERE idUser = ${db.escape(data.idUser)}`
                    db.query(sqlInsert, (err, results) => {
                        if (err) {
                            fs.unlinkSync('./public' + filepath)
                            return res.status(500).send(err)
                        }
                        return res.status(200).send({ message: "Upload file success", success: true })
                    })
                })

            } catch (error) {
                return res.status(500).send(error)
            }
        } else {
            return res.status(200).send({ message: "Anda belum terverifikasi silahkan login", success: false })
        }
    }
})