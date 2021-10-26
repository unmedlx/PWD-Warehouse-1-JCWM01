const { db, query } = require("../database");


module.exports = {
  getData: (req, res) => { },

  getDataById: (req, res) => {
    let scriptQuery = `SELECT p.idProduct, productName, price, productImage, description, p.idCategory, category, idUser, warehouse, quantity 
    FROM db_warehouse1.adminstocks adm 
    JOIN products p on adm.idProduct = p.idProduct
    JOIN categories c on p.idCategory = c.idCategory
    JOIN warehouses w on adm.idWarehouse = w.idWarehouse
    WHERE w.idUser = ${db.escape(req.query.idUser)}
    AND p.idProduct = ${db.escape(req.params.idProduct)};`;

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
    let scriptQuery = `INSERT INTO db_warehouse1.adminstocks VALUES (${db.escape(
      null
    )}, ${db.escape(req.body.idProduct)}, ${db.escape(
      req.body.idWarehouse
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


    let scriptQuery = `UPDATE db_warehouse1.adminstocks SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct} AND idWarehouse = ${req.query.idWarehouse}`;

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
    let scriptQuery = `DELETE from db_warehouse1.adminstocks WHERE idProduct = ${db.escape(
      req.params.idProduct
    )} AND idWarehouse = ${db.escape(req.query.idWarehouse)}`;

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
  // delete adminstock from transaction
  deleteAdminStock: async (req, res) => {
    try {
      const idWarehouse = parseInt(req.query.idWarehouse)
      const idTransaction = parseInt(req.query.idTransaction)

      let getQuery = `SELECT * FROM checkouts WHERE idTransaction = ${db.escape(idTransaction)}`
      const getCheckoutData = await query(getQuery)
      for (let i = 0; i < getCheckoutData.length; i++) {
        let idProduct = getCheckoutData[i].idProduct
        let quantity = getCheckoutData[i].quantity

        let getAdminQuery = `SELECT * FROM adminstocks WHERE idProduct = ${idProduct} && idWarehouse = ${idWarehouse}`
        let getAdminStock = await query(getAdminQuery)

        let adminStockQuantity = getAdminStock[0].quantity

        let newStock = adminStockQuantity - quantity

        let patchAdminQuery = `UPDATE adminstocks SET quantity=${db.escape(newStock)} WHERE idWarehouse=${db.escape(idWarehouse)} AND idProduct=${db.escape(idProduct)}`
        await query(patchAdminQuery)
      }
      return res.status(200).send({ message: "success update adminstock" })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
