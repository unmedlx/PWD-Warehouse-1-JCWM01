const axios = require('axios');
const { db } = require('../database');

const accessToken = '485b31d04ebb76f8ffd684e9bdf75f1d';

module.exports = {
    deliveryRate: async (req, res, next) => {
        const { originCity, destinationCity, courier } = req.body
        console.log(courier);

        let scriptQueryOrigin = `SELECT idCity from city WHERE cityName=${db.escape(originCity)} `
        let scriptQueryDestination = `SELECT idCity from city WHERE cityName=${db.escape(destinationCity)} `

        db.query(scriptQueryOrigin, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }
            let origin = results[0].idCity;
            db.query(scriptQueryDestination, (err, results) => {
                if (err) {
                    return res.status(500).send({ message: 'Error Occurs', success: false, err })
                }
                let destination = results[0].idCity;
                console.log(origin, destination, req.body.courier, accessToken);

                axios.post(`https://api.rajaongkir.com/starter/cost`,
                    {
                        "origin": origin,
                        "destination": destination,
                        "weight": 1000,
                        "courier": req.body.courier
                    },
                    {
                        headers: {
                            key: accessToken
                        }
                    })
                    .then((res) => {
                        req.deliveryRate = res.data
                        next()
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            })
        })





    }

}


