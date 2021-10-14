const { db, query } = require("../database/index"); //mysql


module.exports = {
    addCheckout: async (req, res) => {
        try {
            let cartsGlobal = Object.values(req.body.cartsGlobal)
            let idTransaction = req.body.idTransaction

            for (i = 0; i < cartsGlobal.length; i++) {
                const insertCheckoutItem = await query(`INSERT INTO checkouts 
                VALUES (null,${db.escape(idTransaction)},${db.escape(cartsGlobal[i].idProduct)},${db.escape(cartsGlobal[i].quantity)},${db.escape(cartsGlobal[i].price)})`)
                console.log(insertCheckoutItem);
            }
            res.status(200).send({ message: "Checkout Item is added", success: true });

        } catch (err) {
            return res.status(500).send(err);
        }

    },

}