const { db, query } = require("../database");
const moment = require("moment");

module.exports = {
  // REQUEST STOCK //
  requestStock: async (req, res) => {
    try {
        const requestMaterial = await query(`
          SELECT T.idTransaction , C.idCheckout, C.idProduct, C.quantity AS qtyCheckout, A.idWarehouse ,A.quantity AS qtyAStock
          FROM transactions T
          JOIN checkouts C ON C.idTransaction = T.idTransaction
          JOIN adminstocks A ON C.idProduct = A.idProduct
          WHERE T.idStatus = 4 AND T.idWarehouse = ${db.escape(req.body.idWarehouse)} AND A.idWarehouse = ${db.escape(req.body.idWarehouse)};
          `);
        //Loop product stock checking
        if (requestMaterial.length > 0) {
            for (let i = 0; i < requestMaterial.length; i++) {
              const { idWarehouse, idProduct, idTransaction, qtyCheckout, qtyAStock, } = requestMaterial[i];
              // console.log( "ID Product: ", idProduct, "Checkout Qty: ", qtyCheckout, "AdminStock: ", qtyAStock );

              //Check Stock admin Warehouse Sendiri
              if (qtyAStock - qtyCheckout == 0) {
                let sisaStok = qtyAStock - qtyCheckout;
                console.log("qtyCheckout = qtyAdminStock. sisaStok di admin sendiri: ", sisaStok);
                console.log("D O N E");

              } else if (qtyAStock - qtyCheckout >= 0) {
                let sisaStok = qtyAStock - qtyCheckout;
                console.log( "qtyCheckout < qtyAdminStock. sisaStok di admin sendiri: ",sisaStok);
                console.log("D O N E");

              } else if (qtyAStock - qtyCheckout < 0) {
                let qtyNeeded = Math.abs(qtyAStock - qtyCheckout);
                console.log( "KUDU REQUEST, Id product:", idProduct, ",Kurang : ", qtyNeeded );
                //Mencari Warehouse Dengan stock mumpuni lalu Send Data ke table request
                const getSearchWH = await query(`
                  SELECT *
                  FROM warehouses W
                  JOIN adminstocks A ON A.idWarehouse = W.idWarehouse
                  WHERE A.idProduct = ${db.escape(idProduct)} AND A.quantity != 0 AND W.idWarehouse != ${db.escape(idWarehouse)}; 
                  `);
                //loop checking needed qty and send request data
                for (let j = 0; j < getSearchWH.length; j++) {
                  const idOtherWH = getSearchWH[j].idWarehouse;
                  const qtyOtherWH = getSearchWH[j].quantity;
                  if (qtyNeeded > 0) {
                      //Date Time
                      const transactionDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                      //tentuin request qty nya berapa
                      let qtyRequest = 0;
                      if (qtyNeeded >= qtyOtherWH) {
                        qtyRequest = qtyOtherWH;
                      } else {
                        qtyRequest = qtyNeeded;
                      }
                      // MEMBUAT REQUEST //
                      await query(`INSERT INTO requests VALUES
                        (null, ${db.escape(idWarehouse)}, ${db.escape(idOtherWH)}, ${db.escape(idProduct)}, 
                        ${db.escape(qtyRequest)}, ${db.escape(transactionDate)}, "Requesting Stock", ${db.escape(idTransaction)});`);
                      //Update Qty Needed
                      qtyNeeded = qtyNeeded - qtyRequest;
                  } else {
                      //MAKA TIDAK REQUEST
                      qtyNeeded = 0;
                  }
                }
              }
              await query(`UPDATE transactions SET idStatus = 5 WHERE idTransaction = ${db.escape(idTransaction)} AND idWarehouse = ${db.escape(req.body.idWarehouse)} ; `);
            }
            res.status(200).send({
              message: "Berhasil Request Stock !",
              success: true,
            });
        } else {
          res.status(200).send({
            message: "Tidak Ada Kekurangan Stok Produk",
            success: false,
          });
        }
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // ACCEPT REQUEST //
  acceptRequest: async (req, res) => {
    const { idWarehouse, idRequest, idTransaction } = req.body;
    // console.log(idWarehouse, idRequest, idTransaction);
    try {
      //Date Time
      const dateAccept = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      //Update Request Status & Date
      await query(`UPDATE requests 
      SET status = "Accepted", dateRequest = ${db.escape(dateAccept)} 
      WHERE idSender = ${db.escape(idWarehouse)} 
      AND idRequest = ${db.escape(idRequest)};`);
      //Get Request Data
      const getDataRequest = await query(`SELECT * FROM requests 
      WHERE idSender = ${db.escape(idWarehouse)} 
      AND idRequest = ${db.escape(idRequest)};`);
      const { idSender, idReceiver, idProduct, quantity } = getDataRequest[0];
      //Update Admin Stock Receiver 
      await query(`UPDATE adminstocks 
      SET quantity = quantity + ${db.escape(quantity)}
      WHERE idWarehouse = ${db.escape(idReceiver)} 
      AND idProduct = ${db.escape(idProduct)};`);
      //Update Admin Stock Sender 
      await query(`UPDATE adminstocks 
      SET quantity = quantity - ${db.escape( quantity)}
      WHERE idWarehouse = ${db.escape(idSender)} 
      AND idProduct = ${db.escape(idProduct)};`);
      //Update Transaction idStatus
      await query(`UPDATE transactions 
      SET idStatus = 6 
      WHERE idTransaction = ${db.escape(idTransaction)} 
      AND idWarehouse = ${db.escape(idReceiver)} ; `);
      //Send Response
      res.status(200).send({ message: "Request Accepted", success: true });

    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },

  // GET DATA AND FILTERING //
  getData: async (req, res) => {
    //Variable
    const idWarehouse = req.query.idWarehouse;
    const sortBy = req.query.sortBy;
    const filterStatus = req.query.filterStatus;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let nextPage;
    let previousPage; 
    try {
      //Get Data 
      const results = await query(
        `SELECT R.idRequest, WR.warehouse AS Receiver, WS.warehouse AS Sender, R.idSender,R.idReceiver, R.idProduct, P.productName, P.productImage, R.quantity, R.dateRequest, R.status, R.idTransaction
        FROM requests R
        JOIN products P ON P.idProduct = R.idProduct
        JOIN warehouses WR ON WR.idWarehouse = R.idReceiver 
        JOIN warehouses WS ON WS.idWarehouse = R.idSender
        WHERE R.idReceiver = ${db.escape(idWarehouse)} OR R.idSender = ${db.escape(idWarehouse)};`
        )
        //Filter Data By Status
        const filteredResults = await results.filter((val) => {
            if (filterStatus == "incoming-request") {
              return (
                val.status == "Requesting Stock" && val.idSender == idWarehouse
                );
            } else if (filterStatus == "requesting-stock") {
                return (
                  val.status == "Requesting Stock" && val.idReceiver == idWarehouse
                );
            } else if (filterStatus) {
                return val.status.toLowerCase().includes(filterStatus.toLowerCase());
            } else {
                return results;
            }
          });
          // Sort Data By OnGoing || OutGoing
          const sortByResults = await filteredResults.filter((val) => {
            if (sortBy == "goingin") {
              return val.idReceiver == idWarehouse;
            } else if (sortBy == "goingout") {
              return val.idSender == idWarehouse;
            } else {
              return filteredResults;
            }
          });
         //Sort By Newest || Oldest
          switch (sortBy) {
            case "newest":
              sortByResults.sort((a, b) => b.dateRequest - a.dateRequest);
              break;
            case "oldest":
              sortByResults.sort((a, b) => a.dateRequest - b.dateRequest);
              break;
            default:
              sortByResults
              break;
          }
          //Paginate
          let productsCount = sortByResults.length;
          let maxPage = Math.ceil(productsCount / limit) || 1;
          if (endIndex < productsCount) {
             nextPage = page + 1;
          }
          if (startIndex > 0) {
             previousPage = page - 1;
          }
          const paginatedResults = await sortByResults.slice(startIndex, endIndex);     
          //Response
          res.status(200).send({
            message: `Berhasil mengambil data`,
            data: paginatedResults,
            next_page: nextPage,
            previous_page: previousPage,
            products_count: productsCount,
            max_page: maxPage,
          });

    } catch (error) {
          console.log(error);
          res.status(500).send(error)
    }
  },

};
