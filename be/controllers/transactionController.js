const { db, query } = require("../database/index"); //mysql
const moment = require("moment")
const { uploader } = require('../helper/uploader')
const fs = require('fs')
const nodemailer = require("../helper/nodemailer");
const e = require("express");


module.exports = {
    getDeliveryRate: (req, res) => {
        let results = req.deliveryRate
        return res.status(200).send({ message: 'Success fetch RajaOngkir API', results, success: true })
    },
    addTransaction: async (req, res) => {
        try {
            const { idAddress, idUser, subtotalPrice, deliveryCost, courier, courierService, idWarehouse } = req.body
            const transactionDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            const random = Math.floor(Math.random() * 90000) + 10000;
            const invoiceNumber = `INV/${random}`

            const addTransaction = await query(`INSERT INTO transactions
            VALUES (null,${db.escape(idAddress)},${db.escape(idUser)},${db.escape(subtotalPrice)},${db.escape(deliveryCost)},
            ${db.escape(courier)},${db.escape(courierService)},${db.escape(transactionDate)},${db.escape(1)},${db.escape(idWarehouse)},null,${db.escape(invoiceNumber)})`)


            // await nodemailer.sendMail(mail)
            res.status(200).send({ message: "Transacsion is added, please check your email", success: true, results: addTransaction });

        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getTransaction: async (req, res) => {
        try {
            const idUser = req.query.idUser;


            const type = req.query.type || "all"
            const sortBy = req.query.sortBy;
            const filterStatus = parseInt(req.query.status);
            const filterInvoice = req.query.invoice

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
                (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction WHERE a.idUser=${db.escape(idUser)} && a.idStatus>=1 && a.idStatus<=7`)
            } else if (type === "all") {
                dataTransaction = await query(`SELECT * FROM transactions  as a
                JOIN status as s
                ON a.idStatus=s.idStatus
                JOIN
                (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction WHERE a.idUser=${db.escape(idUser)}
                `)
            }


            //Filter Category
            const filteredResults = dataTransaction.filter((el) => {
                if (filterStatus && filterInvoice) {
                    return (el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase()) &&
                        el.idStatus == filterStatus
                    )
                }
                else if (filterInvoice) {
                    return el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase())
                }
                else if (filterStatus) {
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
    uploadPaymentProof: (req, res) => {
        // console.log(req.query.idUser, req.query.idTransaction);
        const idTransaction = parseInt(req.query.idTransaction)
        if (req.query.idUser == req.user.idUser) {
            try {
                let path = '/images/paymentProof'
                const upload = uploader(path, 'IMG').fields([{ name: 'file' }])

                upload(req, res, (error) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send(error)
                    }

                    // upload ke backend
                    const { file } = req.files
                    const filepath = file ? path + '/' + file[0].filename : null
                    console.log(filepath);


                    let data = JSON.parse(req.body.data)
                    data.userImage = filepath //dari FE tidak ada path yang dikirim maka untuk masukin path ke database kita tambahkan ke object data dengan data.image (image sesuai dengan db)


                    let sqlCheckProof = `SELECT buktiPembayaran FROM transactions WHERE idUser = ${db.escape(data.idUser)} && idTransaction=${db.escape(idTransaction)}`
                    db.query(sqlCheckProof, (err, results) => {
                        // console.log(results[0].buktiPembayaran);
                        if (results[0].buktiPembayaran) {
                            fs.unlinkSync('./public' + results[0].buktiPembayaran)
                        }
                        let sqlInsert = `UPDATE transactions SET buktiPembayaran =${db.escape(data.userImage)},idStatus=2 WHERE idUser = ${db.escape(data.idUser)} && idTransaction=${db.escape(idTransaction)}`
                        console.log(sqlInsert);
                        db.query(sqlInsert, (err, results) => {
                            if (err) {
                                console.log(err)
                                fs.unlinkSync('./public' + filepath)
                                return res.status(500).send(err)
                            }
                            return res.status(200).send({ message: "Upload file success", success: true })
                        })
                    })


                })

            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        } else {
            return res.status(200).send({ message: "Anda belum terverifikasi silahkan login", success: false })
        }
    },
    getDetailTransaction: async (req, res) => {
        console.log(req.params.id + "WAWW");
        try {
            const dataDetailTransaction = await query(`SELECT * FROM transactions as t 
            JOIN status as s ON t.idStatus=s.idStatus
            JOIN addresses a ON t.idAddress = a.idAddress
            WHERE idTransaction=${req.params.id}`)
            console.log(dataDetailTransaction);

            return res.status(200).send({ message: 'Fetch Data Detail Transaction', dataDetailTransaction, success: true })
        } catch (error) {
            return res.status(500).send(error)
        }
        // return res.status(200).send({ message: 'Success fetch RajaOngkir API', results, success: true })
    },
    //GetUser for admin 
    getUserTransaction: async (req, res) => {
        try {
            // const type = req.query.type || "all"//ini either all atau ongoing
            const idRole = parseInt(req.query.idRole)
            const idWarehouse = parseInt(req.query.idWarehouse);
            const sortBy = req.query.sortBy || "newest"
            const filterStatus = parseInt(req.query.status);
            const filterInvoice = req.query.invoice

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 2;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let nextPage;
            let previousPage;
            let fixedDataTransaction;


            if (idRole === 2) {
                const allDataTransaction = await query(`SELECT * FROM transactions  as a
                    JOIN status as s
                    ON a.idStatus=s.idStatus
                    JOIN
                    (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                    JOIN checkouts as c 
                    ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                    ON a.idTransaction=b.idTransaction 
                    JOIN addresses as ad
                    ON a.idAddress = ad.idAddress
                    WHERE idWarehouse = ${db.escape(idWarehouse)}
                    `)

                console.log(allDataTransaction);
                if (allDataTransaction.length > 0) {
                    for (let i = 0; i < allDataTransaction.length; i++) {
                        const { idWarehouse, idTransaction, idStatus } = allDataTransaction[i]

                        if (idStatus === 3) {
                            const dataCheckout = await query(`SELECT C.idCheckout, C.idProduct, C.quantity AS qtyCheckout, A.idWarehouse ,A.quantity AS qtyAdminStock
                            FROM checkouts C
                            JOIN transactions T ON T.idTransaction=C.idTransaction
                            JOIN adminstocks A ON C.idProduct = A.idProduct 
                            WHERE C.idTransaction=${db.escape(idTransaction)} && A.idWarehouse = ${db.escape(idWarehouse)} && T.idStatus=3`)
                            // console.log(`Banyaknya data checkout warehouse ${idWarehouse} Transaksi ${idTransaction} adalah ${dataCheckout.length}`);

                            let transactionKurang = 6
                            // iterasi mengecek checkout per transaksi
                            for (let j = 0; j < dataCheckout.length; j++) {
                                const { qtyCheckout, qtyAdminStock } = dataCheckout[j]
                                if (qtyCheckout > qtyAdminStock) {
                                    transactionKurang = 4
                                }
                            }

                            const statusQuery = (`UPDATE transactions SET idStatus = ${transactionKurang} WHERE idTransaction=${db.escape(idTransaction)}`)
                            console.log(`Transaksi dengan id ${idTransaction} kurangnya ${transactionKurang}`);
                            console.log(statusQuery);

                            await query(statusQuery)


                            if (transactionKurang === true) {
                                // sampai sini

                                console.log("diubah jadi 4");
                                // await query(`UPDATE transactions
                                // SET idStatus = 4
                                // WHERE idTransaction=${db.escape(idTransaction)};`)

                            } else if (transactionKurang === false) {
                                console.log("diubah jadi 6");
                                // await query(`UPDATE transactions
                                // SET idStatus = 6
                                // WHERE idTransaction=${db.escape(idTransaction)};`)
                            }
                        }

                    }
                }

            }



            if (idRole === 1) {
                fixedDataTransaction = await query(`SELECT * FROM transactions  as a
                JOIN status as s
                ON a.idStatus=s.idStatus
                JOIN
                (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction 
                JOIN addresses as ad
                ON a.idAddress = ad.idAddress
                `)
            } else {
                fixedDataTransaction = await query(`SELECT * FROM transactions  as a
                    JOIN status as s
                    ON a.idStatus=s.idStatus
                    JOIN
                    (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                    JOIN checkouts as c 
                    ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                    ON a.idTransaction=b.idTransaction 
                    JOIN addresses as ad
                    ON a.idAddress = ad.idAddress
                    WHERE idWarehouse = ${db.escape(idWarehouse)}
                    `)
            }


            console.log(filterStatus, filterInvoice);
            //Filter Category
            const filteredResults = fixedDataTransaction.filter((el) => {
                if (filterStatus && filterInvoice) {
                    return (el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase()) &&
                        el.idStatus == filterStatus
                    )
                }
                else if (filterInvoice) {
                    return el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase())
                }
                else if (filterStatus) {
                    return el.idStatus == filterStatus;
                } else {
                    return fixedDataTransaction;
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
            console.log(sortBy, filterStatus, filterInvoice, page, maxPage, startIndex, endIndex);
            const paginatedResults = filteredResults.slice(startIndex, endIndex);

            res.status(200).send({
                message: `Berhasil mengambil data`,
                data: paginatedResults,
                next_page: nextPage,
                previous_page: previousPage,
                transactions_count: transactionsCount,
                max_page: maxPage,
                currentPage: page
            })

        } catch (error) {
            res.status(500).send(error)
        }
    },
    // Get User super admin
    getUserTransactionSuper: async (req, res) => {
        try {
            // const type = req.query.type || "all"//ini either all atau ongoing
            const filterWarehouse = parseInt(req.query.idWarehouse);
            const sortBy = req.query.sortBy || "newest"
            const filterStatus = parseInt(req.query.status);
            const filterInvoice = req.query.invoice

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let nextPage;
            let previousPage;
            let fixedDataTransaction;


            fixedDataTransaction = await query(`SELECT * FROM transactions  as a
                JOIN status as s
                ON a.idStatus=s.idStatus
                JOIN
                (SELECT t.idTransaction, COUNT(quantity) as sumquantity FROM transactions as t 
                JOIN checkouts as c 
                ON t.idTransaction=c.idTransaction group by t.idTransaction) as b
                ON a.idTransaction=b.idTransaction 
                JOIN addresses as ad
                ON a.idAddress = ad.idAddress
                `)


            const warehouseFilter = fixedDataTransaction.filter((el) => {
                if (filterWarehouse) {
                    return el.idWarehouse == filterWarehouse;
                }
            })



            console.log(filterStatus, filterInvoice);
            //Filter Category
            const filteredResults = warehouseFilter.filter((el) => {
                if (filterStatus && filterInvoice) {
                    return (el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase()) &&
                        el.idStatus == filterStatus
                    )
                }
                else if (filterInvoice) {
                    return el.invoiceNumber
                        .toLowerCase()
                        .includes(filterInvoice.toLowerCase())
                }
                else if (filterStatus) {
                    return el.idStatus == filterStatus;
                } else {
                    return warehouseFilter;
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
            console.log(sortBy, filterStatus, filterInvoice, page, maxPage, startIndex, endIndex);
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

    // Payment
    patchPaymentStatus: async (req, res) => {
        try {
            const paymentStatus = req.query.paymentStatus
            const idTransaction = parseInt(req.query.idTransaction)
            console.log(req.query.idTransaction);
            console.log(req.query.paymentStatus);
            if (paymentStatus === "accepted") {
                console.log("ditolak");
                await query(`UPDATE transactions SET idStatus=3 WHERE idTransaction=${db.escape(idTransaction)}`)

            } else if (paymentStatus === "declined") {
                console.log("ditolak");
                await query(`UPDATE transactions SET idStatus=2 WHERE idTransaction=${db.escape(idTransaction)}`)

            }

            res.status(200).send({ message: "Success change payment status" })
        } catch (error) {
            res.status(500).send(error)
        }
    },

    //Change Status
    patchTransactionStatus: async (req, res) => {
        try {
            const idTransaction = parseInt(req.query.idTransaction)
            const idStatus = parseInt(req.query.idStatus)
            const changeStatus = await query(`UPDATE transactions SET idStatus=${db.escape(idStatus)} WHERE idTransaction=${db.escape(idTransaction)}`)
            res.status(200).send({ message: "Success Change Transaction Status", data: changeStatus })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}