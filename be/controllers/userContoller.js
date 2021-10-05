const { db } = require('../database/index')


module.exports = {
    editData: (req, res) => {
        let { id, fullName, username, email, gender, dateOfBirth } = req.body

        // res.status(200).send(req.body)
        let scriptQuery = `UPDATE users SET fullName=${db.escape(fullName)}, username=${db.escape(username)},email=${db.escape(email)},gender=${db.escape(gender)},dateOfBirth=${db.escape(dateOfBirth)} WHERE idUser=${db.escape(id)}`
        console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
            // err = true
            if (err) res.status(500).send({ message: "Gagal mengambil data di database", success: false, err })
            res.status(200).send(results)
        })
    },

    getUser: (req, res) => {
        let idUser = req.params.id

        // res.status(200).send(req.body)
        let scriptQuery = `SELECT * FROM users WHERE idUser=${db.escape(idUser)}`
        db.query(scriptQuery, (err, results) => {
            // err = true
            if (err) res.status(500).send({ message: "Gagal mengambil data di database", success: false, err })
            res.status(200).send(results)
        })
    }

}