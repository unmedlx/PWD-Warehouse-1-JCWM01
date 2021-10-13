const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `SELECT * FROM db_warehouse1.warehouses
    WHERE idUser = ${req.query.idUser};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
      console.log(results);
    });
  },

  getWarehouseList: (req, res) => {
    let scriptQuery = `SELECT idWarehouse, warehouse, w.idUser, latitude, longitude, kota, provinsi, fullName, username, email, userImage 
    FROM db_warehouse1.warehouses w
    JOIN users u ON w.idUser = u.idUser;`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
      console.log(results);
    });
  },

  getWarehouseData: (req, res) => {
    let scriptQuery = `SELECT idWarehouse, warehouse, w.idUser, latitude, longitude, kota, provinsi, fullName, username, email, userImage 
    FROM db_warehouse1.warehouses w
    JOIN users u ON w.idUser = u.idUser
    WHERE w.warehouse = ${db.escape(req.query.warehouse)};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
      console.log(results);
    });
  },

  getDataById: (req, res) => {},

  addData: (req, res) => {
    const { warehouse, adminEmail, latitude, longitude, city, province } =
      req.addressData;

    console.log(req.addressData);

    let scriptQuery = `SELECT idUser 
    FROM db_warehouse1.users u
    WHERE u.email = ${db.escape(adminEmail)};`;

    db.query(scriptQuery, (err, results) => {
      console.log(results[0].idUser);
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      } else {
        let warehouseQuery = `INSERT INTO db_warehouse1.warehouses
        VALUES (${db.escape(null)},
        ${db.escape(warehouse)},
        ${db.escape(results[0].idUser)},
        ${db.escape(latitude)},
        ${db.escape(longitude)},
        ${db.escape(city)},
        ${db.escape(province)});`;

        db.query(warehouseQuery, (err, results) => {
          if (err) {
            return res
              .status(500)
              .send({ message: "Error Occurs", success: false, err });
          }
          return res.status(200).send({
            message: "Berahasil Menambahkan Data Warehouse",
            results,
            success: true,
          });
        });
      }
    });
  },

  editData: (req, res) => {},

  deleteData: (req, res) => {},
};
