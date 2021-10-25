const { db, query } = require("../database/index"); //mysql

module.exports = {
  getDataCart: (req, res) => {
    let { idUser } = req.user;
    let scriptQuery = `SELECT *,(c.quantity*p.price) as subtotal FROM carts c 
        JOIN products p ON p.idProduct=c.idProduct
        JOIN categories ca ON p.idCategory=ca.idCategory
        WHERE idUser=${db.escape(idUser)};`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Cart",
        results,
        success: true,
      });
    });
  },
  deleteDataCart: async (req, res) => {
    let cartsGlobal = Object.values(req.body);
    try {
      for (i = 0; i < cartsGlobal.length; i++) {
        const deleteDataCart = await query(
          `DELETE FROM carts WHERE idCart=${db.escape(cartsGlobal[i].idCart)}`
        );
      }
      return res.status(200).send({ message: "cart deleted", success: true });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getData: (req, res) => {
    let scriptQuery = `SELECT c.idProduct, c.idUser, c.quantity, p.productName, p.price, p.productImage
    FROM db_warehouse1.carts c
    JOIN products p ON c.idProduct = p.idProduct
    JOIN users u ON c.idUser = u.idUser
    WHERE c.idUser = ${db.escape(req.query.idUser)};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  getDataById: (req, res) => {
    let scriptQuery = `SELECT *
    FROM db_warehouse1.carts
    WHERE idUser = ${db.escape(req.query.idUser)}
    AND idProduct = ${db.escape(req.params.idProduct)};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  addData: (req, res) => {
    let scriptQuery = `INSERT INTO db_warehouse1.carts VALUES (${db.escape(
      null
    )}, ${db.escape(req.body.idProduct)}, ${db.escape(
      req.body.idUser
    )}, ${db.escape(req.body.quantity)});`;


    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },

  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let scriptQuery = `UPDATE db_warehouse1.carts SET ${dataUpdate} WHERE idProduct = ${db.escape(
      req.params.idProduct
    )} AND idUser = ${(db, escape(req.query.idUser))}`;
    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal merubah data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  deleteData: (req, res) => {
    let scriptQuery = `DELETE from db_warehouse1.carts WHERE idProduct = ${db.escape(
      req.params.idProduct
    )} AND idUser = ${db.escape(req.query.idUser)}`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal menghapus data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },
};
