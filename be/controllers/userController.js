const { db } = require("../database/index"); //mysql
const Crypto = require("crypto"); // for hashing
//Middleware
const { createToken } = require("../helper/createToken");
const nodemailer = require("../helper/nodemailer");

module.exports = {
  // REGISTER //
  register: (req, res) => {
    //hash pass
    let { fullName, username, email, password } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
    //query
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
          let mail = {
            from: `Admin <ayyasluthfi@gmail.com>`,
            to: `${email}`,
            subject: `Acount Verification`,
            html: `<a href="http://localhost:3000/verification/${Token}"> Hello ${username}, Click here to verify your account</a>`,
          };
          nodemailer.sendMail(mail, (errMail, restMail) => {
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                messege: "Registration failed",
                success: false,
              });
            }
            res.status(200).send({
              messege: "Registration success, check your email",
              success: true,
            });
          });
        });
      }
    });
  },

  // VERIFICATION //
  verification: (req, res) => {
    console.log(req.user);
    //update isverified: 1
    let verifyQuery = `UPDATE users SET isVerified = 1 WHERE idUser = ${req.user.idUser};`;
    db.query(verifyQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ messege: "acount unverified", success: false });
      }
      res.status(200).send({ messege: "acount verified", success: true });
    });
  },

  // LOGIN //
  login: (req, res) => {
    //hash password
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    //query
    let loginQuery = `SELECT * FROM users WHERE email=${db.escape(
      req.body.email
    )} AND password =${db.escape(req.body.password)} ;`;
    //inject query
    db.query(loginQuery, (err, results) => {
      //if error
      if (err) res.status(500).send(err);
      //if not error create token n check status
      if (results[0]) {
        //user data
        let {
          idUser,
          fullName,
          username,
          email,
          password,
          idRole,
          isVerified,
        } = results[0];
        //check verified
        if (isVerified != 1) {
          res
            .status(200)
            .send({ messege: "account not verified", success: false });
        } else {
          //Create Token
          let Token = createToken({
            idUser,
            fullName,
            username,
            email,
            password,
            idRole,
            isVerified,
          });
          res.status(200).send({
            messege: "Login Success",
            success: true,
            token: Token,
            dataLogin: results[0],
          });
        }
      }
    });
  },
};
