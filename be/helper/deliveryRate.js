const axios = require('axios');
const { db, query } = require('../database');

const accessToken = process.env.PW1J_RAJAONGKIR;

module.exports = {
    deliveryRate: async (req, res, next) => {
        try {
            const { originCity, destinationCity, courier } = req.body
            const getOriginId = await query(`SELECT idCity from city WHERE cityName=${db.escape(originCity)} `)
            const getDestinationId = await query(`SELECT idCity from city WHERE cityName=${db.escape(destinationCity)} `)

            let origin = getOriginId[0].idCity;
            let destination = getDestinationId[0].idCity;

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
}


