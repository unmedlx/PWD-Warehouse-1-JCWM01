const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getRevenueYear: (req, res) => {
    let scriptQuery = `SELECT YEAR(transactionDate) AS year, SUM(subtotalPrice) AS revenueOfTheYear
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    GROUP BY YEAR(transactionDate);`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getRevenueMonth: (req, res) => {
    let scriptQuery = `SELECT MONTH(transactionDate) AS month, SUM(subtotalPrice) AS revenueOfTheMonth
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    AND YEAR(t.transactionDate) = ${db.escape(req.query.year)}
    GROUP BY MONTH(transactionDate);`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getRevenueDay: (req, res) => {
    let scriptQuery = `SELECT DAY(transactionDate) AS date, SUM(subtotalPrice) AS revenueOfTheDate
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    AND MONTH(t.transactionDate) = ${db.escape(req.query.month)}
    AND YEAR(t.transactionDate) = ${db.escape(req.query.year)}
    GROUP BY DAY(transactionDate);`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getTransactionStatus: (req, res) => {
    let scriptQuery = `SELECT s.status, COUNT(*) AS jumlahOrder from db_warehouse1.transactions t
    JOIN status s ON t.idStatus = s.idStatus
    WHERE t.idWarehouse = ${db.escape(req.query.idWarehouse)}
    GROUP BY t.idStatus;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getDemographic: (req, res) => {
    let scriptQuery = `SELECT a.kota, SUM(subtotalPrice) AS revenueKota
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    JOIN users u ON t.idUser = u.idUser
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    GROUP BY a.kota;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getBestSelling: (req, res) => {
    let scriptQuery = `SELECT p.productName, SUM(quantity) AS soldQuantity
    FROM db_warehouse1.transactions t
    JOIN checkouts c ON c.idTransaction = t.idTransaction
    JOIN products p ON c.idProduct = p.idProduct
    WHERE idWarehouse = 2
    GROUP BY p.productName
    ORDER BY soldQuantity DESC
    LIMIT 5;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },
};
