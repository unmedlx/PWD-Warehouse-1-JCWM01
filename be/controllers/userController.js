const { db } = require("../database/index"); //mysql
const crypto = require("crypto"); // for hashing
//Middleware

module.exports = {
  getData: (req, res) => {
    const query = "SELECT * FROM users ;";
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
};
