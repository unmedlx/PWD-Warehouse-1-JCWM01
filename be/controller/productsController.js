const { db } = require("../database")

module.exports = {
  getData: (req, res) => {
    const sortBy = req.query.sortBy

    const filterProductName = req.query.productName
    const filterCategory = req.query.idCategory

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let nextPage
    let previousPage

    let scriptQuery = `SELECT * FROM db_warehouse1.products;`
    console.log(page)
    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        })
      }

      const filteredResults = results.filter((el) => {
        if (filterProductName && filterCategory) {
          return (
            el.productName
              .toLowerCase()
              .includes(filterProductName.toLowerCase()) &&
            parseInt(el.idCategory) == parseInt(filterCategory)
          )
        } else if (filterProductName) {
          return el.productName
            .toLowerCase()
            .includes(filterProductName.toLowerCase())
        } else if (filterCategory) {
          return parseInt(el.idCategory) == parseInt(filterCategory)
        } else {
          return results
        }
      })

      let productsCount = filteredResults.length
      let maxPage = Math.ceil(productsCount / limit)

      if (endIndex < productsCount) {
        nextPage = page + 1
      }
      if (startIndex > 0) {
        previousPage = page - 1
      }

      const compareString = (a, b) => {
        if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
          return 1
        } else if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
          return -1
        }
        return 0
      }

      switch (sortBy) {
        case "lowPrice":
          filteredResults.sort((a, b) => a.price - b.price)
          break
        case "highPrice":
          filteredResults.sort((a, b) => b.price - a.price)
          break
        case "az":
          filteredResults.sort(compareString)
          break
        case "za":
          filteredResults.sort(compareString).reverse()
          break
        default:
          filteredResults
          break
      }

      const paginatedResults = filteredResults.slice(startIndex, endIndex)

      res.status(200).send({
        message: `Berhasil mengambil data`,
        data: paginatedResults,
        next_page: nextPage,
        previous_page: previousPage,
        products_count: productsCount,
        max_page: maxPage,
      })
    })
  },

  getDataById: (req, res) => {
    let scriptQuery = `SELECT * FROM db_warehouse1.products WHERE idProduct = ${db.escape(
      req.params.idProduct
    )};`

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        })
      }
      res.status(200).send(results)
    })
  },

  addData: (req, res) => {
    let { productName, price, productImage, description, idCategory } = req.body

    let scriptQuery = `INSERT INTO db_warehouse1.products VALUES (${db.escape(
      null
    )}, ${db.escape(productName)}, ${db.escape(price)}, ${db.escape(
      productImage
    )}, ${db.escape(description)}, ${db.escape(idCategory)});`

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal menambah data ke database",
          success: false,
          err,
        })
      }
      res.status(200).send({
        message: `${productName} berhasil ditambahkan`,
        data: results,
      })
    })
  },

  editData: (req, res) => {
    let dataUpdate = []
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
    }

    let scriptQuery = `UPDATE db_warehouse1.products SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct}`

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal merubah data di database",
          success: false,
          err,
        })
      }
      res.status(200).send(results)
    })
  },

  deleteData: (req, res) => {
    let scriptQuery = `DELETE from db_warehouse1.products WHERE idProduct = ${db.escape(
      req.params.idProduct
    )}`

    db.query(scriptQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal menghapus data di database",
          success: false,
          err,
        })
      }
      res.status(200).send(results)
    })
  },
}
