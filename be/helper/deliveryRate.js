const axios = require('axios');
const { db, query } = require('../database');

const accessToken = '485b31d04ebb76f8ffd684e9bdf75f1d';

module.exports = {
    deliveryRate: async (req, res, next) => {
        try {
            const { originCity, destinationCity, courier } = req.body
            const getOriginId = await query(`SELECT idCity from city WHERE cityName=${db.escape(originCity)} `)
            const getDestinationId = await query(`SELECT idCity from city WHERE cityName=${db.escape(destinationCity)} `)

            let origin = getOriginId[0].idCity;
            let destination = getDestinationId[0].idCity;
            // console.log(origin, destination, courier);

            const getDeliveryRate = await axios.post(`https://api.rajaongkir.com/starter/cost`,
                {
                    "origin": origin,
                    "destination": destination,
                    "weight": 1000,
                    "courier": courier
                },
                {
                    headers: {
                        key: accessToken
                    }
                })
            req.deliveryRate = getDeliveryRate.data
            next()


        }
        catch (err) {
            return res.status(500).send({ message: 'Error Occurs', success: false, err })
        }


    },
    // deliveryRate: async (req, res, next) => {
    //     const { originCity, destinationCity, courier } = req.body

    //     let scriptQueryOrigin = `SELECT idCity from city WHERE cityName=${db.escape(originCity)} `
    //     let scriptQueryDestination = `SELECT idCity from city WHERE cityName=${db.escape(destinationCity)} `

    //     db.query(scriptQueryOrigin, (err, results) => {
    //         if (err) {
    //             return res.status(500).send({ message: 'Error Occurs', success: false, err })
    //         }
    //         let origin = results[0].idCity;
    //         db.query(scriptQueryDestination, (err, results) => {
    //             if (err) {
    //                 return res.status(500).send({ message: 'Error Occurs', success: false, err })
    //             }
    //             let destination = results[0].idCity;
    //             console.log(origin, destination, req.body.courier, accessToken);

    //             axios.post(`https://api.rajaongkir.com/starter/cost`,
    //                 {
    //                     "origin": origin,
    //                     "destination": destination,
    //                     "weight": 1000,
    //                     "courier": req.body.courier
    //                 },
    //                 {
    //                     headers: {
    //                         key: accessToken
    //                     }
    //                 })
    //                 .then((res) => {
    //                     req.deliveryRate = res.data
    //                     next()
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 })

    //         })
    //     })

    // }

}


