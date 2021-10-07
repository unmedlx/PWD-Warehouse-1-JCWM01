const { db } = require("../database/index"); //mysql
const Crypto = require("crypto"); // for hashing
//Middleware
const { createToken } = require("../helper/createToken");
const { createTokenF } = require("../helper/forgotPassword/createTokenF");
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
      //Check Register Data
      if (results.length === 0) {
        return res
          .status(200)
          .send({ message: "Data Form Not Complete", success: false });
      }
      //If Data Saved//
      if (results) {
        //get user data
        let newUserQuery = `SELECT * FROM users WHERE idUser = ${results.insertId} ;`;
        db.query(newUserQuery, (err1, results1) => {
          if (err1) {
            console.log(err);
            res.status(500).send(err);
          }
          //Create Token
          delete results1[0].password;
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
                message: "Registration failed",
                success: false,
              });
            }
            res.status(200).send({
              message:
                "Registration And Login Success, check your email to verify account",
              success: true,
              token: Token,
              dataUser: results1[0],
            });
          });
        });
      }
    });
  },

  // VERIFICATION //
  verification: (req, res) => {
    //update isverified: 1
    let verifyQuery = `UPDATE users SET isVerified = 1 WHERE idUser = ${req.user.idUser};`;
    db.query(verifyQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "acount unverified", success: false });
      }
      res.status(200).send({ message: "acount verified", success: true });
    });
  },

  // LOGIN //
  login: (req, res) => {
    //hash password
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    //QUERY USER DATA
    let loginQuery = `SELECT * FROM users WHERE email=${db.escape(
      req.body.email
    )} AND password =${db.escape(req.body.password)} ;`;
    //inject query
    db.query(loginQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      //Check USER Data
      if (results.length === 0) {
        return res
          .status(200)
          .send({ message: "Account Is Not Registered", success: false });
      }
      // Check isVerified & Create Token
      if (results[0]) {
        //user data
        delete results[0].password;
        let { idUser, fullName, username, email, idRole, isVerified } =
          results[0];
        //check isVerified
        if (isVerified != 1) {
          return res
            .status(200)
            .send({ message: "Account Is Not Verified", success: false });
        } else {
          //Create Token
          let Token = createToken({
            idUser,
            fullName,
            username,
            email,
            idRole,
            isVerified,
          });
          return res.status(200).send({
            message: "Login Success",
            success: true,
            token: Token,
            dataUser: results[0],
          });
        }
      }
    });
  },

  // FORGOT PASSWORD //
  forgotPassword: (req, res) => {
    //Query
    let selectQuery = `SELECT * FROM users WHERE email =${db.escape(
      req.body.email
    )} ;`;
    db.query(selectQuery, (err, results) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
      }

      // Check Data User
      if (results.length === 0) {
        res
          .status(200)
          .send({ message: "Email Is Not Registered", success: false });
        return;
      }

      //If User Data Exist
      if (results) {
        //Create Token
        let { idUser, fullName, username, email, idRole, isVerified } =
          results[0];
        let Token = createTokenF({
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
          html: `<a href="http://localhost:3000/reset-password/${idUser}/${Token}"> Hai ${username}, Click here to Reset your password, this link valid for only 1 hour</a>`,
        };
        //nodemailer
        nodemailer.sendMail(mail, (errMail, restMail) => {
          if (errMail) {
            console.log(errMail);
            res.status(500).send({
              message: "req forgot password failed",
              success: false,
            });
          }
          res.status(200).send({
            message: "Request Forgot Password Success  ✔",
            success: true,
          });
        });
      }
    });
  },

  // VERIFICATION FORGOT //
  verificationF: (req, res) => {
    //hash password
    req.body.newPassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newPassword)
      .digest("hex");
    const newPassword = req.body.newPassword;
    //update password
    let updateQuery = `UPDATE users SET password = "${newPassword}" WHERE idUser = ${req.user.idUser};`;
    db.query(updateQuery, (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "update password failed", success: false });
      }
      res
        .status(200)
        .send({ message: "update password success ✔", success: true });
    });
  },
};
