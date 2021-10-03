const { db } = require("../database/index"); //mysql
const Crypto = require("crypto"); // for hashing
//Middleware
const { createToken } = require("../helper/createToken");

module.exports = {
  // REGISTER //
  register: (req, res) => {
    let { fullName, username, email, password } = req.body;

    password = Crypto.createHmac("sha1", "hash123") //hash pass
      .update(password)
      .digest("hex");

    let registerQuery = `INSERT INTO users VALUES (
          null,
          ${db.escape(fullName)},
          ${db.escape(username)},
          ${db.escape(email)},
          ${db.escape(password)},
          3,
          "profile.png",
          0,
          null,
          null 
          );
        `;
    // inject registerQuery
    db.query(registerQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      //If Inject Data Success//
      if (results) {
        //get user data
        let newUserQuery = `SELECT * FROM users WHERE idUser = ${results.insertId} ;`;
        db.query(newUserQuery, (err1, results1) => {
          if (err1) {
            console.log(err);
            res.status(500).send(err);
          }

          //Create Token
          let { idUser, fullName, username, email, idRole, isVerified } =
            results1[0];
          let Token = createToken({
            idUser,
            fullName,
            username,
            email,
            idRole,
            isVerified,
          });

          //Send Verify Email
          res.status(200).send({
            nama: `Hello ${username}`,
            messege: "Registration success",
            success: true,
            TokenMu: Token,
          });
        });
      }
    });
  },
};
