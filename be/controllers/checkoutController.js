const { db } = require("../database/index"); //mysql


module.exports = {
    addCheckout: (req, res) => {
        let cartsGlobal = Object.values(req.body.cartsGlobal)
        let idTransaction = req.body.idTransaction

        for (i = 0; i < cartsGlobal.length; i++) {
            let scriptQuery = `INSERT INTO checkouts 
            VALUES (null,${db.escape(idTransaction)},${db.escape(cartsGlobal[i].idProduct)},${db.escape(cartsGlobal[i].quantity)},${db.escape(cartsGlobal[i].price)})`
            db.query(scriptQuery, (err, results) => {
                if (err) {
                    res.status(500).send({ message: "Transaction is error", success: false, err });
                }
                console.log(results);
            })
        }
        res.status(200).send({ message: "Checkout Item is added", success: true });
    },

}