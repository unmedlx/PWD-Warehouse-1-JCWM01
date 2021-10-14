const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
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
