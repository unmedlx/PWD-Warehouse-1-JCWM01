const { db } = require("../database/index"); //mysql


module.exports = {
    getAddress: (req, res) => {
        idUser = parseInt(req.params.id)
        // console.log(scriptQuery);
        let scriptQuery = `SELECT * FROM addresses WHERE idUser=${req.params.id}`
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            return res.status(200).send({ message: 'Berahasil Mengambil Data Alamat', results, success: true })
        })
    },
    editAddress: (req, res) => {
        console.log(req.addressData.longitude);
        console.log(req.addressData.latitude);

        let scriptQuery = `UPDATE addresses SET isDefault = 0 where idUser=${req.params.id}`
        // console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            let scriptQueryAlter = `UPDATE addresses SET recipientName=${db.escape(req.addressData.recipientName)},phoneNumber=${db.escape(req.addressData.phoneNumber)},jalan=${db.escape(req.addressData.jalan)},kecamatan=${db.escape(req.addressData.kecamatan)},kota=${db.escape(req.addressData.city)},provinsi=${db.escape(req.addressData.province)},zip=${db.escape(req.addressData.zip)},isDefault=${db.escape(req.addressData.isDefault)},latitude=${db.escape(req.addressData.latitude)},longitude=${db.escape(req.addressData.longitude)} WHERE idAddress=${db.escape(req.addressData.idAddress)}`
            console.log(scriptQueryAlter);
            db.query(scriptQueryAlter, (err, results) => {
                if (err) {
                    return res.status(500).send({ message: 'Error Occurs', success: false, err })
                }
                return res.status(200).send({ message: 'Berahasil Mengubah Data Alamat', results, success: true })

            })
        })


    },
    addAddress: (req, res) => {
        // console.log(req.addressData);
        const { recipientName, phoneNumber, kecamatan, city, province, zip, jalan, idUser, latitude, longitude } = req.addressData
        let scriptQuery = `SELECT * FROM addresses WHERE idUser=${idUser}`
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            //Check alamat udah ada 5 atau belum
            if (results.length >= 5) {
                return res.status(200).send({ message: 'Anda hanya bisa memiliki 5 alamat', results, success: true })
            } else {

                let scriptQuery = `INSERT INTO addresses (recipientName,phoneNumber,kecamatan,kota,provinsi,zip,jalan,idUser,isDefault,latitude,longitude) 
                VALUES(${db.escape(recipientName)},${db.escape(phoneNumber)},${db.escape(kecamatan)},${db.escape(city)},${db.escape(province)},${db.escape(zip)},${db.escape(jalan)},${db.escape(idUser)},0,${db.escape(longitude)},${db.escape(latitude)})`
                console.log(scriptQuery);
                db.query(scriptQuery, (err, results) => {
                    if (err) {
                        return res.status(500).send({ message: 'Error Occurs', success: false, err })
                    }
                    return res.status(200).send({ message: 'Berahasil Menambahkan Data Alamat', results, success: true })
                })
            }

        })

    },
    deleteAddress: (req, res) => {
        // console.log(req.params.idAddress);
        let idAddress = req.params.idAddress;
        let scriptQuery = `DELETE FROM addresses WHERE idAddress=${idAddress}`
        // console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            return res.status(200).send({ message: 'Berahasil Menghapus Data Alamat', results, success: true })
        })
    },
    //GET DATA CHECK LOGIN
    getDataAddress: (req, res) => {
        let scriptQuery = `SELECT * FROM addresses WHERE idUser=${req.user.idUser}`
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }

            // console.log(results);
            if (results === undefined) {
                console.log("tal define");
            }
            results.forEach(function (result, i) {
                if (result.isDefault === 1) {
                    results.splice(i, 1);
                    results.unshift(result);
                }
            });

            // console.log(results);
            return res
                .status(200)
                .send(results);
        })

    }
}