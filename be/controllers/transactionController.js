const { db } = require("../database/index"); //mysql


module.exports = {
    getDeliveryRate: (req, res) => {
        // console.log("DElivery RAte");
        // console.log(req.body);
        let results = req.deliveryRate
        return res.status(200).send({ message: 'Success fetch RajaOngkir API', results, success: true })
    }
}