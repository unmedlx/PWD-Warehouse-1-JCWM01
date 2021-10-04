const { db } = require('../database/index')
const { uploader } = require('../helper/uploader')
const fs = require('fs')


module.exports = ({
    uploadImage: (req, res) => {
        try {
            let path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'file' }])

            upload(req, res, (error) => {
                if (error) {
                    console.log(error)
                    res.status(500).send(error)
                }

                const { file } = req.files
                const filepath = file ? path + '/' + file[0].filename : null
                console.log(filepath);


                let data = JSON.parse(req.body.data)
                data.userImage = filepath //dari FE tidak ada path yang dikirim maka untuk masukin path ke database kita tambahkan ke object data dengan data.image (image sesuai dengan db)
                console.log(data)

                let sqlGetOldProfile = `SELECT userImage FROM users WHERE idUser = ${db.escape(data.idUser)}`
                db.query(sqlGetOldProfile, (err, results) => {
                    if (results[0].userImage != '/images/profile-default.png') {
                        console.log("ini tidak default");
                        fs.unlinkSync('./public' + results[0].userImage)
                    } else {
                        console.log("Ini Default");
                    }
                })


                let sqlInsert = `UPDATE users SET userImage =${db.escape(data.userImage)} WHERE idUser = ${db.escape(data.idUser)}`
                console.log(sqlInsert);
                db.query(sqlInsert, (err, results) => {
                    if (err) {
                        console.log(err)
                        fs.unlinkSync('./public' + filepath)
                        return res.status(500).send(err)
                    }
                    return res.status(200).send({ message: "Upload file success" })
                })
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },
    uploadTest: (req, res) => {
        console.log(JSON.parse(req.body.data));
    }
})