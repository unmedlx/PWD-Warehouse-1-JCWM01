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

  getDataSql: (req,res) => {
    let query = `
    SELECT T.idTransaction , C.idCheckout, C.idProduct, C.qtyProduct, A.idWarehouse ,A.quantity  
    FROM transactions T
    JOIN checkouts C ON C.idTransaction = T.idTransaction
    JOIN adminstocks A ON C.idProduct = A.idProduct
    WHERE T.idStatus = 2 AND T.idWarehouse = 3 AND A.idWarehouse = 3;
    `
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
      }
      // res.status(200).send(results)
      for (let i = 0; i < results.length; i++) {
        const idWarehouse = results[i].idWarehouse
        const idProduct = results[i].idProduct
        const qtyCheckout = results[i].qtyProduct;
        const qtyAStock = results[i].quantity;
        console.log(idProduct);
        console.log("Checkout Qty: ",qtyCheckout);
        console.log("AdminStock: ",qtyAStock);
        if (qtyCheckout === qtyAStock) {
          let sisaStok = qtyAStock - qtyCheckout
          console.log("qtyCheckout = qtyAdminStock. sisaStok: ", sisaStok);
          console.log("D O N E");
        }else if (qtyCheckout < qtyAStock) {
          let sisaStok = qtyAStock - qtyCheckout
          console.log("qtyCheckout < qtyAdminStock. sisaStok: ", sisaStok);
          console.log("D O N E");
        }else{
          let qtyNeeded = Math.abs(qtyCheckout - qtyAStock)
          console.log("qtyCheckout > qtyAdminStock KUDU REQUEST, Kurang : ", qtyNeeded);
          const querySearchWH = `
          SELECT * 
          FROM warehouses W
          JOIN adminstocks A ON A.idWarehouse = W.idWarehouse
          WHERE A.idProduct = ${db.escape(idProduct)} AND A.quantity != 0 AND W.idWarehouse != ${db.escape(idWarehouse)};
          `
          db.query(querySearchWH, (err1, resultsWH) => {
            if (err1) {
              console.log(err1);
            }
            // console.log(resultsWH);
            for (let i = 0; i < resultsWH.length; i++) {
              const idOtherWH = resultsWH[i].warehouse
              const qtyOtherWH = resultsWH[i].quantity
              qtyNeeded = qtyNeeded - qtyOtherWH
              console.log("dari WH:", idOtherWH );
              console.log("sisa stok yang diperlukan:",qtyNeeded);
              
            }
            console.log(qtyNeeded);
            res.send(resultsWH)

          })

        }

      }
    })
  }
};
