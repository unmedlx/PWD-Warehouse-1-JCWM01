const axios = require('axios');
const { db, query } = require('../database');

const accessToken = process.env.PW1J_MAPBOX;

module.exports = {
    findDistance: async (req, res, next) => {
        try {
            const address = [req.body.longitude, req.body.latitude];
            const getCoor = await query(`SELECT longitude,latitude FROM warehouses;`)
            let arrResults = []
            for (let i = 0; i < getCoor.length; i++) {
                arrResults.push(Object.values(getCoor[i]))
            }
            let distances = []
            let promises = []
            // arrResults = [[106.654437, -6.302235], [106.88, -6.16], [107.61611, -6.87278]]

            const getPostSync = async () => {
                for (i = 0; i < arrResults.length; i++) {
                    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${arrResults[i]};${address}?geometries=geojson&steps=true&access_token=${accessToken}`
                    promises.push(
                        await axios.get(url)
                            .then((response) => {
                                if (response.data.code === "NoRoute") {
                                    errorMessage = "Alamat tidak terjangkau, silahkan pilih alamat lain"
                                } else {
                                    distances.push(response.data.routes[0].distance)
                                }
                            })
                    )
                }
                Promise.all(promises).then(() => {
                    req.distances = distances
                    next()
                });
            }
            getPostSync()

        }
        catch (error) {
            return res.status(500).send({ message: 'Error Occurs', success: false, err })
        }

    },



}


