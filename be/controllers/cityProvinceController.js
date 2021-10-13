const { db } = require("../database/index"); //mysql

module.exports = {
  getProvince: (req, res) => {
    let scriptQuery = `SELECT * FROM province`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }
      return res.status(200).send({
        message: "Berahasil Mengambil Data Provinsi",
        results,
        success: true,
      });
    });
  },
  getCity: (req, res) => {
    const province = req.query.province;
    let scriptQuery = `SELECT idProvince FROM province WHERE provinceName=${db.escape(
      province
    )}`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }
      const idProvince = results[0].idProvince;

      let scriptQuery = `SELECT * FROM city WHERE idProvince=${db.escape(
        idProvince
      )}`;
      db.query(scriptQuery, (err, results) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error Occurs", success: false, err });
        }
        return res.status(200).send({
          message: "Berahasil Mengambil Data Kota",
          results,
          success: true,
        });
      });
    });
  },
};
