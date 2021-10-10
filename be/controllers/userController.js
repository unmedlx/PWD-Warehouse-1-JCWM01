const { db } = require("../database/index"); //mysql
const Crypto = require("crypto"); // for hashing
const moment = require("moment")
const bcrypt = require('bcrypt');
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
          "/images/profile-default.png",
          0,
          3,
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
        res
          .status(200)
          .send({ messege: "Data Form Not Complete", success: false });
        return;
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
    //QUERY USER DATA
    let loginQuery = `SELECT * FROM users WHERE email=${db.escape(
      req.body.email
    )} AND password =${db.escape(req.body.password)} ;`;
    //inject query
    db.query(loginQuery, (err, results) => {
      //if error
      if (err) res.status(500).send(err);
      //Check USER Data
      if (results.length === 0) {
        res
          .status(200)
          .send({ messege: "Account Is Not Registered", success: false });
        return;
      }
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
          return res
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
          return res.status(200).send({
            messege: "Login Success",
            success: true,
            token: Token,
            dataLogin: results[0],
          });
        }
      }
    });
  },
  //GET DATA CHECK LOGIN
  getDataUser: (req, res) => {
    let scriptQuery = `SELECT *  FROM users WHERE idUser=${req.user.idUser}`
    db.query(scriptQuery, (err, results) => {
      var parsed = moment(results[0].dateOfBirth).format('YYYY-MM-DD');
      results = { ...results[0], dateOfBirth: parsed }
      return res
        .status(200)
        .send(results);
    })

  },
  //EDIT DATA USER PROFILE//
  editDataUser: (req, res) => {
    const idUser = req.user.idUser
    let { fullName, username, email, gender, dateOfBirth } = req.body
    var parsed = moment(dateOfBirth).format('YYYY-MM-DD');


    let scriptQuery = `UPDATE users SET fullName=${db.escape(fullName)}, username=${db.escape(username)},email=${db.escape(email)},gender=${db.escape(gender)},dateOfBirth=${db.escape(parsed)} WHERE idUser=${db.escape(idUser)}`
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Update Gagal', success: false, err })
      }
      return res.status(200).send({ message: 'Berhasil Mengubah Data', results, success: true })
    })



  },
  //CHANGE PASSWORD//
  changePasswordUser: (req, res) => {
    let { idUser } = req.user;
    let { password, oldPassword } = req.body.data;

    console.log(password);
    console.log(idUser);
    console.log(oldPassword);

    //hash password baru
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");

    //hash password baru
    oldPassword = Crypto.createHmac("sha1", "hash123")
      .update(oldPassword)
      .digest("hex");
    console.log(oldPassword);
    console.log(password);


    let scriptQuery = `SELECT * FROM users WHERE idUser=${db.escape(idUser)} AND password=${db.escape(oldPassword)}`
    console.log(scriptQuery);

    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Data Tidak Ditemukan', success: false, err })
      }
      console.log(results.length);
      if (results.length == 0) {
        console.log("kosongg");
        return res.status(200).send({ message: 'Password anda salah', success: false })
      }
      if (results[0].password == oldPassword) {
        //EDIT DATA PASSWORD
        let scriptQuery = `UPDATE users SET password=${db.escape(password)} WHERE idUser=${db.escape(idUser)}`
        console.log(scriptQuery);
        db.query(scriptQuery, (err, results) => {
          if (err) {
            return res.status(500).send({ message: 'Update Gagal', success: false, err })
          }
          return res.status(200).send({ message: 'Berhasil Mengubah Password', success: true, err })
        })

      }
    })


  }
};
