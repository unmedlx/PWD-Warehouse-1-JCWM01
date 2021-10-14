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
        return
      }
      //Loop product stock checking
      for (let i = 0; i < results.length; i++) {
        const idWarehouse = results[i].idWarehouse
        const idProduct = results[i].idProduct
        const qtyCheckout = results[i].qtyProduct;
        const qtyAStock = results[i].quantity;
        console.log("ID Product: ",idProduct, "Checkout Qty: ",qtyCheckout, "AdminStock: ",qtyAStock );

        //Check Stock admin Warehouse Sendiri
        if (qtyAStock - qtyCheckout == 0) {
          let sisaStok = qtyAStock - qtyCheckout
          console.log("qtyCheckout = qtyAdminStock. sisaStok di admin sendiri: ", sisaStok);
          console.log("D O N E");
        
        }else if (qtyAStock - qtyCheckout >= 0) {
          let sisaStok = qtyAStock - qtyCheckout
          console.log("qtyCheckout < qtyAdminStock. sisaStok di admin sendiri: ", sisaStok);
          console.log("D O N E");
        
        }else if(qtyAStock - qtyCheckout < 0){
          let qtyNeeded = Math.abs(qtyAStock - qtyCheckout)
          console.log("KUDU REQUEST, Id product:", idProduct ,",Kurang : ", qtyNeeded);
          
          //Mencari Warehouse Dengan stock mumpuni lalu Send Data ke table request
          const querySearchWH = `
          SELECT * 
          FROM warehouses W
          JOIN adminstocks A ON A.idWarehouse = W.idWarehouse
          WHERE A.idProduct = ${db.escape(idProduct)} AND A.quantity != 0 AND W.idWarehouse != ${db.escape(idWarehouse)};   `
          
          db.query(querySearchWH, (err1, resultsWH) => {
            if (err1) {
              console.log(err1);
            }
            // warehouse yang didapat
            console.log(resultsWH);
            //loop checking needed qty and send request data
            for (let j = 0; j < resultsWH.length; j++) {
              const idOtherWH = resultsWH[j].warehouse
              const qtyOtherWH = resultsWH[j].quantity
             
              if (qtyNeeded > 0) {
                //maka request
                qtyNeeded = qtyNeeded - qtyOtherWH 
                if (qtyNeeded < 0) {
                  qtyNeeded = 0
                }
                console.log("loop",[j],"idProduct:",idProduct ,"dari warehouse:",idOtherWH,". stok di WH ini:",qtyOtherWH ,"needed qty jadi:",qtyNeeded);

              }else if (qtyNeeded <= 0) {
                //maka ga request
                qtyNeeded = 0
                console.log("loop",[j],"stok sudah terpenuhi . stok yang dibutuhkan:",qtyNeeded);
              }   
              
            }

            console.log("Sekarang qtyNeeded idProduct",idProduct, ":",qtyNeeded);
          })

        }

      }
      res.status(200).send(results)

    })
  }
};
