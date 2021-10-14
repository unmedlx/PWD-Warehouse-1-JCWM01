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
      // console.log(results);
    });
  },

  getDataById: (req, res) => {},

  addData: (req, res) => {},

  editData: (req, res) => {},

  deleteData: (req, res) => {},

  
  
};
