const { db, query } = require("../database");

module.exports = {
    requestStock: async (req, res ) => {
      try {
        const requestMaterial = await query(`
        SELECT T.idTransaction , C.idCheckout, C.idProduct, C.qtyProduct, A.idWarehouse ,A.quantity  
        FROM transactions T
        JOIN checkouts C ON C.idTransaction = T.idTransaction
        JOIN adminstocks A ON C.idProduct = A.idProduct
        WHERE T.idStatus = 2 AND T.idWarehouse = ${db.escape(req.body.idWarehouse)} AND A.idWarehouse = ${db.escape(req.body.idWarehouse)};
        `)
      
          //Loop product stock checking
          for (let i = 0; i < requestMaterial.length; i++) {
            const idWarehouse = requestMaterial[i].idWarehouse
            const idProduct = requestMaterial[i].idProduct
            const qtyCheckout = requestMaterial[i].qtyProduct;
            const qtyAStock = requestMaterial[i].quantity;
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
              const getSearchWH = await query(`
                SELECT * 
                FROM warehouses W
                JOIN adminstocks A ON A.idWarehouse = W.idWarehouse
                WHERE A.idProduct = ${db.escape(idProduct)} AND A.quantity != 0 AND W.idWarehouse != ${db.escape(idWarehouse)};   `
              ) 
              
                //loop checking needed qty and send request data
                for (let j = 0; j < getSearchWH.length; j++) {
                  console.log("qtyneeded diluar for loop",qtyNeeded);
                  const idOtherWH = getSearchWH[j].idWarehouse
                  const qtyOtherWH = getSearchWH[j].quantity
                  
                  if (qtyNeeded > 0) {
                    //tentuin request qty nya berapa
                    let qtyRequest = 0
                    if (qtyNeeded >= qtyOtherWH) {
                      qtyRequest = qtyOtherWH
                    }else{
                      qtyRequest = qtyNeeded
                    }                    
                    // MEMBUAT REQUEST //
                    await query(
                      `INSERT INTO requests VALUES 
                      (null, ${db.escape(idWarehouse)}, ${db.escape(idOtherWH)}, ${db.escape(idProduct)}, ${db.escape(qtyRequest)}, 2021, "Requesting Stock");`
                    ) 
                    qtyNeeded = qtyNeeded - qtyRequest
                 
                }else{
                    //maka ga request
                    qtyNeeded = 0
                  }    
                }
              }
            }
            res.status(200).send({message: "ini request stock ke warehouse lain", success: true})

      } catch (error) {
        res.status(500).send(error)
      }
    },

    acceptRequest: async (req, res) => {
        const {idWarehouse, idRequest} = req.body
        const queryUpdate = `UPDATE requests SET status = "Accepted" WHERE idSender = ${db.escape(idWarehouse)} AND idRequest = ${db.escape(idRequest)};`
        const querySelect = `SELECT * FROM requests WHERE idSender = ${db.escape(idWarehouse)} AND idRequest = ${db.escape(idRequest)};`
        try {
             await query(queryUpdate)
            
             const getDataRequest = await query(querySelect)
             const {idSender, idReceiver, idProduct, quantity} = getDataRequest[0]        
             await query (`UPDATE adminstocks SET quantity = quantity + ${db.escape(quantity)} 
                          WHERE idWarehouse = ${db.escape(idReceiver)} AND idProduct = ${db.escape(idProduct)};`)
                
             await query( `UPDATE adminstocks SET quantity = quantity - ${db.escape(quantity)} 
                          WHERE idWarehouse = ${db.escape(idSender)} AND idProduct = ${db.escape(idProduct)};`)
            // await query(`UPDATE transactions SET idStatus = 3 WHERE `)
                
            res.status(200).send({message: "Request Accepted", success: true})
        } catch (error) {
            res.status(500).send(error)
        }
    },

    getRequest: (req, res) => {
        try {
            const {idWarehouse} = req.body
            const getData = 
            `SELECT R.idRequest, WR.warehouse AS Receiver, WS.warehouse AS Sender, R.idProduct, P.productName, P.productImage, R.quantity, R.dateRequest, R.status
            FROM requests R
            JOIN products P ON P.idProduct = R.idProduct
            JOIN warehouses WR ON WR.idWarehouse = R.idReceiver 
            JOIN warehouses WS ON WS.idWarehouse = R.idSender
            WHERE R.idReceiver = ${db.escape(idWarehouse)} OR R.idSender = ${db.escape(idWarehouse)};`
            // `SELECT * FROM requests WHERE idSender = ${db.escape(idWarehouse)} OR idReceiver = ${db.escape(idWarehouse)};`
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