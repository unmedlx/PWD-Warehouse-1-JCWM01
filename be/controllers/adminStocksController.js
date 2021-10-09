const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {},

  getDataById: (req, res) => {
    let scriptQuery = `SELECT sum(quantity) AS sumQuantity
    FROM db_warehouse1.adminstocks adm 
    JOIN products p on adm.idProduct = p.idProduct
    JOIN warehouses w on adm.idWarehouse = w.idWarehouse
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

  addData: (req, res) => {},

  editData: (req, res) => {},

  deleteData: (req, res) => {},
};
