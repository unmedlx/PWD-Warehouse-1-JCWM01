const { db } = require('../database/index')


module.exports = {
    get: (req, res) => {
        let scriptQuery = `SELECT * FROM users`
        db.query(scriptQuery, (err, results) => {
            // err = true
            if (err) res.status(500).send({ message: "Gagal mengambil data di database", success: false, err })
            res.status(200).send(results)
        })
    }

}