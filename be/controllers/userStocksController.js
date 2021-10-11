const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {},

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

  editData: (req, res) => {},

  deleteData: (req, res) => {},
};
