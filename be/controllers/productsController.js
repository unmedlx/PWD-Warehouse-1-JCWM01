const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    const newArrival = req.query.newArrival
    const sortBy = req.query.sortBy;

    const filterProductName = req.query.productName;
    const filterCategory = req.query.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let nextPage;
    let previousPage;

    let scriptQuery = `SELECT idProduct, productName, price, productImage, description, category FROM products p JOIN categories c on p.idCategory = c.idCategory;`;
    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      if (newArrival) {
        return res.send(results.slice((results.length) - 5, results.length));
      }

      const filteredResults = results.filter((el) => {
        if (filterProductName && filterCategory) {
          return (
            el.productName
              .toLowerCase()
              .includes(filterProductName.toLowerCase()) &&
            el.category.toLowerCase().includes(filterCategory.toLowerCase())
          );
        } else if (filterProductName) {
          return el.productName
            .toLowerCase()
            .includes(filterProductName.toLowerCase());
        } else if (filterCategory) {
          return el.category
            .toLowerCase()
            .includes(filterCategory.toLowerCase());
        } else {
          return results;
        }
      });

      let productsCount = filteredResults.length;
      let maxPage = Math.ceil(productsCount / limit);

      if (endIndex < productsCount) {
        nextPage = page + 1;
      }
      if (startIndex > 0) {
        previousPage = page - 1;
      }

      const compareString = (a, b) => {
        if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
          return 1;
        } else if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
          return -1;
        }
        return 0;
      };

      switch (sortBy) {
        case "lowPrice":
          filteredResults.sort((a, b) => a.price - b.price);
          break;
        case "highPrice":
          filteredResults.sort((a, b) => b.price - a.price);
          break;
        case "az":
          filteredResults.sort(compareString);
          break;
        case "za":
          filteredResults.sort(compareString).reverse();
          break;
        default:
          filteredResults;
          break;
      }

      const paginatedResults = filteredResults.slice(startIndex, endIndex);

      res.status(200).send({
        message: `Berhasil mengambil data`,
        data: paginatedResults,
        next_page: nextPage,
        previous_page: previousPage,
        products_count: productsCount,
        max_page: maxPage,
      });
    });
  },

  getDataById: (req, res) => {
    let scriptQuery = `SELECT idProduct, productName, price, productImage, description, category FROM products p JOIN categories c on p.idCategory = c.idCategory WHERE idProduct = ${db.escape(
      req.params.idProduct
    )};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  addData: (req, res) => {
    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        data.productImage = filepath;

        let scriptQuery = `INSERT INTO db_warehouse1.products VALUES (${db.escape(
          null
        )}, ${db.escape(data.productName)}, ${db.escape(
          data.price
        )}, ${db.escape(filepath)}, ${db.escape(data.description)}, ${db.escape(
          data.idCategory
        )});`;
        db.query(scriptQuery, [], (err, results) => {
          if (err) {
            fs.unlinkSync(`./public` + filepath);
            res.status(500).send({
              message: "Gagal menambah data ke database",
              success: false,
              err,
            });
          }
          res.status(200).send(results);
          // db.query(
          //   `SELECT idProduct from db_warehouse1.products WHERE productName = ${db.escape(
          //     data.productName
          //   )}`,
          //   (err2, results2) => {
          //     if (err2) {
          //       res.status(500).send(err2);
          //     }
          //     res.status(200).send({
          //       message: `${data.productName} berhasil ditambahkan`,
          //       data: results2,
          //     });
          //   }
          // );
        });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editDataNoImage: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let scriptQuery = `UPDATE db_warehouse1.products SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct}`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal menambah data ke database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  editData: (req, res) => {
    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        data.productImage = filepath;

        let dataUpdate = [];
        for (let prop in data) {
          dataUpdate.push(`${prop} = ${db.escape(data[prop])}`);
        }

        let scriptQuery = `UPDATE db_warehouse1.products SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct}`;

        db.query(scriptQuery, [], (err, results) => {
          if (err) {
            // fs.unlinkSync(`./public` + filepath);
            res.status(500).send({
              message: "Gagal merubah data di database",
              success: false,
              err,
            });
          }
          res.status(200).send(results);
        });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteData: (req, res) => {
    let scriptQuery = `DELETE from db_warehouse1.products WHERE idProduct = ${db.escape(
      req.params.idProduct
    )}`;

    db.query(scriptQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal menghapus data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },
};
