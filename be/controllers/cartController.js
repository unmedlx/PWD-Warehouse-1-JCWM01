const { db, query } = require("../database/index"); //mysql


module.exports = {
    getDataCart: (req, res) => {
        console.log(req.user);
        let { idUser } = req.user
        let scriptQuery = `SELECT *,(c.quantity*p.price) as subtotal FROM carts c 
        JOIN products p ON p.idProduct=c.idProduct
        JOIN categories ca ON p.idCategory=ca.idCategory
        WHERE idUser=${db.escape(idUser)};`
        db.query(scriptQuery, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error Occurs', success: false, err })
            }


            return res
                .status(200)
                .send({ message: 'Berahasil Mengambil data Cart', results, success: true });
        })
    },
    deleteDataCart: async (req, res) => {
        let cartsGlobal = Object.values(req.body)
        try {
            for (i = 0; i < cartsGlobal.length; i++) {
                console.log(cartsGlobal[i].idCart)
                const deleteDataCart = await query(`DELETE FROM carts WHERE idCart=${db.escape(cartsGlobal[i].idCart)}`)
            }
            return res.status(200).send({ message: "cart deleted", success: true });
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}