const { db, query } = require("../database");

module.exports = {
    userStockCheck: async (req, res, next) => {
        try {
            let cartsGlobal = Object.values(req.body.cartsGlobal)
            // console.log(cartsGlobal);

            //cek data di userstock
            for (i = 0; i < cartsGlobal.length; i++) {
                let cartQuantity = cartsGlobal[i].quantity
                let productName = cartsGlobal[i].productName

                const getUserStocks = await query(`SELECT SUM(quantity) as totalUserstock FROM userstocks WHERE idproduct=${db.escape(cartsGlobal[i].idProduct)}`)

                if (cartQuantity > getUserStocks[0].totalUserstock) {
                    return res.status(500).send({ message: "Stock diwarehouse tidak cukup", success: false });
                }
            }

            next()

        } catch (err) {
            return res.status(500).send(err);
        }

    }
}

