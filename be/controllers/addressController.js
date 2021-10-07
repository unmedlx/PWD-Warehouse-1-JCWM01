const { db } = require("../database/index"); //mysql


module.exports = {
    getAdress: (req, res) => {
        idUser = parseInt(req.params.id)
        console.log(idUser);
        let scriptQuery = `SELECT * FROM addresses WHERE idUser=${req.params.id}`
        console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            return res.status(200).send({ message: 'Berahasil Mengambil Data Alamat', results, success: true })
        })
    }
}