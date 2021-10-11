const axios = require('axios');
const { addAddress } = require('../controllers/addressController');

const accessToken = 'pk.eyJ1IjoiYWx5d2hpdGV3b2xmaWUiLCJhIjoiY2t1NThuMnlpMjV4MDJ1bnpkNmxsMDN1diJ9.URoEKnnGUymc3wZxHmWC2Q';

module.exports = {
    getCoor: (req, res, next) => {
        const kecamatan = req.body.data.kecamatan;
        const kota = req.body.data.city;
        const provinsi = req.body.data.province;
        const address = `${kecamatan} ${kota} ${provinsi}`

        var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address) + '.json?access_token='
            + accessToken + '&limit=1';



        axios.get(url)
            .then((response) => {
                const coordinate = (response.data.features[0].geometry.coordinates);
                addressData = { ...req.body.data, latitude: coordinate[1], longitude: coordinate[0] }
                req.addressData = addressData
                next()
            })
            .catch((error) => {
                console.log(error);
            })

    }

}


