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
    },
    editAddress: (req, res) => {
        console.log(req.params.id);
        console.log(req.body);

        let scriptQuery = `UPDATE addresses SET isDefault = 0 where idUser=${req.params.id}`
        console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            let scriptQueryAlter = `UPDATE addresses SET recipientName=${db.escape(req.body.recipientName)},phoneNumber=${db.escape(req.body.phoneNumber)},jalan=${db.escape(req.body.jalan)},kecamatan=${db.escape(req.body.kecamatan)},kota=${db.escape(req.body.kota)},provinsi=${db.escape(req.body.provinsi)},zip=${db.escape(req.body.zip)},isDefault=${db.escape(req.body.isDefault)} WHERE idAddress=${db.escape(req.body.idAddress)}`
            console.log(scriptQueryAlter);
            db.query(scriptQueryAlter, (err, results) => {
                if (err) {
                    return res.status(500).send({ message: 'Error Occurs', success: false, err })
                }
                return res.status(200).send({ message: 'Berahasil Mengubah Data Alamat', results, success: true })

            })
        })
    }
}