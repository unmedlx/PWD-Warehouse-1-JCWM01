const { db, query } = require("../database/index"); //mysql
const moment = require("moment")


module.exports = {
    getDeliveryRate: (req, res) => {
        let results = req.deliveryRate
        return res.status(200).send({ message: 'Success fetch RajaOngkir API', results, success: true })
    },
    addTransaction: async (req, res) => {
        try {
            const { idAddress, idUser, subtotalPrice, deliveryCost, courier, courierService, idWarehouse } = req.body
            const transactionDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

            const addTransaction = await query(`INSERT INTO transactions
            VALUES (null,${db.escape(idAddress)},${db.escape(idUser)},${db.escape(subtotalPrice)},${db.escape(deliveryCost)},
            ${db.escape(courier)},${db.escape(courierService)},${db.escape(transactionDate)},${db.escape(1)},${db.escape(idWarehouse)},null)`)

            res.status(200).send({ message: "transaction is added", success: true, results: addTransaction });

        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getTransaction: async (req, res) => {
        // if (filterStatus == 10) {
        //     return el.idStatus >= 1 && el.idStatus <= 3;
        // }
        try {
            const idUser = req.query.idUser;


            const type = req.query.type || "all"
            const sortBy = req.query.sortBy;
            const filterStatus = parseInt(req.query.status);

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let nextPage;
            let previousPage;
            let dataTransaction;


            //Check apakah sedang untuk ongoing atau semua
            if (type === "ongoing") {
                dataTransaction = await query(`SELECT * FROM transactions  as a
                JOIN status as s
                ON a.idStatus=s.idStatus
                JOIN
                (SELECT t.idTransaction, SUM(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction WHERE a.idUser=${db.escape(idUser)} && a.idStatus>=1 && a.idStatus<=3`)
            } else if (type === "all") {
                dataTransaction = await query(`SELECT * FROM transactions  as a
                JOIN status as s
                ON a.idStatus=s.idStatus
                JOIN
                (SELECT t.idTransaction, SUM(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction WHERE a.idUser=${db.escape(idUser)}
                `)
            }


            //Filter Category
            const filteredResults = dataTransaction.filter((el) => {
                if (filterStatus) {
                    return el.idStatus == filterStatus;
                } else {
                    return dataTransaction;
                }
            });


            //Filter sort by (newest, oldest)
            switch (sortBy) {
                case "oldest":
                    filteredResults.sort((a, b) => a.transactionDate - b.transactionDate);
                    break;
                case "newest":
                    filteredResults.sort((a, b) => b.transactionDate - a.transactionDate);
                    break;
                default:
                    filteredResults;
                    break;
            }


            // console.log(filteredResults);
            let transactionsCount = filteredResults.length;
            let maxPage = Math.ceil(transactionsCount / limit)

            if (endIndex < transactionsCount) {
                nextPage = page + 1;
            }
            if (startIndex > 0) {
                previousPage = page - 1;
            }

            const paginatedResults = filteredResults.slice(startIndex, endIndex);

            res.status(200).send({
                message: `Berhasil mengambil data`,
                data: paginatedResults,
                next_page: nextPage,
                previous_page: previousPage,
                transactions_count: transactionsCount,
                max_page: maxPage,
            })

        } catch (error) {
            res.status(500).send(error)
        }
    },
}