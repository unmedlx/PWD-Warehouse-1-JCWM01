const { db } = require("../database/index"); //mysql


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
    }
}