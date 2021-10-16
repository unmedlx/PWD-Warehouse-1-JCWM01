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

        } catch (error) {
            return res.status(500).send(error);
        }

    },
    getCheckout: async (req, res) => {
        console.log(req.params.id);
        try {
            const getDataCheckout = await query(`SELECT * FROM checkouts as ch 
            JOIN products as p ON ch.idProduct=p.idProduct
            JOIN transactions as t ON t.idTransaction =ch.idTransaction
            WHERE ch.idTransaction=${db.escape(req.params.id)};`)
            console.log(getDataCheckout);
            res.status(200).send({ message: "Get Data Transaction", data: getDataCheckout, success: true });
        } catch (error) {
            return res.status(500).send(error);

        }
    }

}