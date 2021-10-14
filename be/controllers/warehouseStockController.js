const { db } = require("../database");

module.exports = {
    requestStock: (req, res ) => {
        let query = `
        SELECT T.idTransaction , C.idCheckout, C.idProduct, C.qtyProduct, A.idWarehouse ,A.quantity  
        FROM transactions T
        JOIN checkouts C ON C.idTransaction = T.idTransaction
        JOIN adminstocks A ON C.idProduct = A.idProduct
        WHERE T.idStatus = 2 AND T.idWarehouse = ${db.escape(req.body.idWarehouse)} AND A.idWarehouse = ${db.escape(req.body.idWarehouse)};
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
                // console.log(resultsWH);
                //loop checking needed qty and send request data
                for (let j = 0; j < resultsWH.length; j++) {
                  const idOtherWH = resultsWH[j].idWarehouse
                  const qtyOtherWH = resultsWH[j].quantity
                  
                  if (qtyNeeded > 0) {
                    //tentuin request qty nya berapa
                    let qtyRequest = 0
                    if (qtyNeeded > qtyOtherWH) {
                      qtyRequest = qtyOtherWH
                    }else if (qtyNeeded < qtyOtherWH) {
                      qtyRequest = qtyNeeded
                    } else if(qtyNeeded = qtyOtherWH) {
                      qtyRequest = qtyNeeded
                    }
                    // console.log("loop",[j],"idProduct:",idProduct ,"dari warehouse:",idOtherWH,". stok di WH ini:",qtyOtherWH ,"request qty:",qtyRequest);
                    // MEMBUAT REQUEST //
                    qtyNeeded = qtyNeeded - qtyRequest
                    let queryRequest = `INSERT INTO requests VALUES 
                    (null, ${db.escape(idWarehouse)}, ${db.escape(idOtherWH)}, ${db.escape(idProduct)}, ${db.escape(qtyRequest)}, 2021, "Requesting Stock");`
                    db.query(queryRequest, (err, results) =>{
                        if (err) {
                            console.log(err);
                        }
                        console.log("Request D O N E");
                    })
                 
                }else if (qtyNeeded <= 0) {
                    //maka ga request
                    qtyNeeded = 0
                    // console.log("loop",[j],"stok udah ga kurang",qtyNeeded,"gaperlu request");
                  }    
                }
                // console.log("Sekarang qtyNeeded idProduct",idProduct, ":",qtyNeeded);
              })
            }
          }
          res.status(200).send({message: "ini request stock ke warehouse lain", results})
        })
    },

    acceptRequest: async (req, res) => {
        console.log(req.body);
        const {idWarehouse, idRequest} = req.body
        const queryUpdate = `UPDATE requests SET status = "Accepted" WHERE idSender = ${db.escape(idWarehouse)} AND idRequest = ${db.escape(idRequest)};`
        const querySelect = `SELECT * FROM requests WHERE idSender = ${db.escape(idWarehouse)} AND idRequest = ${db.escape(idRequest)};`
        try {
             await db.query(queryUpdate)
             db.query(querySelect, (err, results) => {
                 if (err) {
                   res.status(500).send(err)
                 }
                // res.status(200).send(results)
                const {idSender, idReceiver, idProduct, quantity} = results[0]
                const updateStockReceiver = 
                `UPDATE adminstocks SET quantity = quantity + ${db.escape(quantity)} 
                 WHERE idWarehouse = ${db.escape(idReceiver)} AND idProduct = ${db.escape(idProduct)};`
                const updateStockSender = 
                `UPDATE adminstocks SET quantity = quantity - ${db.escape(quantity)} 
                 WHERE idWarehouse = ${db.escape(idSender)} AND idProduct = ${db.escape(idProduct)};`
                db.query(updateStockReceiver)
                db.query(updateStockSender)
                console.log(idProduct);
                res.status(200).send("Accept And Update Stock Proceed")
             })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },

    getRequest: (req, res) => {
        try {
            const {idWarehouse} = req.body
            const getData = `SELECT * FROM requests WHERE idSender = ${db.escape(idWarehouse)} OR idReceiver = ${db.escape(idWarehouse)};`
            db.query(getData, (err, results) => {
                if (err) {
                 res.status(500).send(err)   
                }else{
                 res.status(200).send(results)   
                }
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}