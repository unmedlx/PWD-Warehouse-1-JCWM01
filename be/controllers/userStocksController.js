const { db, query } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => { },

  getDataById: (req, res) => {
    let scriptQuery = `SELECT sum(quantity) AS sumQuantity
    FROM db_warehouse1.userstocks usr 
    JOIN products p on usr.idProduct = p.idProduct
    JOIN warehouses w on usr.idWarehouse = w.idWarehouse
    WHERE p.idProduct = ${db.escape(req.params.idProduct)};`;

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
    let scriptQuery = `INSERT INTO db_warehouse1.userstocks VALUES (${db.escape(
      null
    )}, ${db.escape(req.body.idProduct)}, ${db.escape(
      req.body.idWarehouse
    )}, ${db.escape(req.body.quantity)});`;

    console.log(req.body.idProduct);
    console.log(req.body.idWarehouse);
    console.log(req.body.quantity);

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

    console.log(dataUpdate);

    let scriptQuery = `UPDATE db_warehouse1.userstocks SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct} AND idWarehouse = ${req.query.idWarehouse}`;

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
    let scriptQuery = `DELETE from db_warehouse1.userstocks WHERE idProduct = ${db.escape(
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
  // Edit User Stock dari checkout
  editUserStock: async (req, res) => {

    try {
      let cartsGlobal = Object.values(req.body.cartsGlobal)
      // console.log(cartsGlobal);
      for (i = 0; i < cartsGlobal.length; i++) {
        let cartQuantity = cartsGlobal[i].quantity
        const getUserStocks = await query(`SELECT * FROM userstocks WHERE idproduct=${db.escape(cartsGlobal[i].idProduct)}`)

        for (j = 0; j < getUserStocks.length; j++) {
          let stockWarehouse = getUserStocks[j].quantity

          if (cartQuantity - stockWarehouse >= 0) {
            await query(`UPDATE userstocks SET quantity=${db.escape(0)} WHERE idProduct = ${db.escape(getUserStocks[j].idProduct)} AND idWarehouse=${db.escape(getUserStocks[j].idWarehouse)}`)
            cartQuantity = cartQuantity - stockWarehouse

          } else {
            await query(`UPDATE userstocks SET quantity=${db.escape(stockWarehouse - cartQuantity)} WHERE idProduct = ${db.escape(getUserStocks[j].idProduct)} AND idWarehouse=${db.escape(getUserStocks[j].idWarehouse)}`)
            cartQuantity = 0

          }
        }
      }
      return res.status(200).send({ message: "userstocks updated", success: true });

    } catch (err) {
      return res.status(500).send(err);
    }


  }
};
