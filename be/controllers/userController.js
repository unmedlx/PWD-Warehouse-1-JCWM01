const { db } = require("../database/index"); //mysql
const moment = require("moment"); // ubah format tanggal
const Crypto = require("crypto"); // for encrypt
//Hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Middleware
const { createToken } = require("../helper/createToken");
const { createTokenF } = require("../helper/forgotPassword/createTokenF");
const nodemailer = require("../helper/nodemailer");

module.exports = {
  // REGISTER //
  register: (req, res) => {
    //User Data Input//
    let { fullName, username, email, password } = req.body;
    //Check Is Email Exist//
    const checkEmailQuery = `SELECT * FROM users WHERE email = ${db.escape(email)} ;`;
    db.query(checkEmailQuery, (err, results) => {
      if (results.length > 0) {
        console.log(results.length);
        console.log(results);
        res.send({
          message: "This Email Already Registered",
          message1: "Try Again With Different Email",
          success: false,
        });
        return;
      } else {
        // console.log(results.length);
        // Hash Pass
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            password = hash;
            // Insert Data User To DB
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
            db.query(registerQuery, (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              }
              //If Data Inserted In DB
              if (results) {
                //get user data
                let newUserQuery = `SELECT * FROM users WHERE idUser = ${results.insertId} ;`;
                db.query(newUserQuery, (err1, results1) => {
                  if (err1) {
                    console.log(err);
                    res.status(500).send(err);
                  }
                  // Create Token
                  delete results1[0].password;
                  let {
                    idUser,
                    fullName,
                    username,
                    email,
                    idRole,
                    isVerified,
                  } = results1[0];
                  let Token = createToken({
                    idUser,
                    fullName,
                    username,
                    email,
                    idRole,
                    isVerified,
                  });
                  // Send Verify Email
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
                    } else {
                      res.status(200).send({
                        message:
                          "Registration And Login Success, check your email to verify account",
                        success: true,
                        token: Token,
                        dataUser: results1[0],
                      });
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  },

  // ACCOUNT VERIFICATION //
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
    //Query
    let loginQuery = `SELECT * FROM users WHERE email=${db.escape(
      req.body.email
    )};`;
    //inject Query
    db.query(loginQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //Checking User Data
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
        //Compare Password
        bcrypt.compare(req.body.password, password, (error, response) => {
          //  console.log(response);
          if (error) {
            console.log(error);
            return;
          }
          if (response) {
            delete results[0].password;
            //check isVerified
            if (isVerified != 1) {
              res.send({ message: "Account Is Not Verified", success: false });
              return;
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
              res.status(200).send({
                message: "Login Success",
                success: true,
                token: Token,
                dataUser: results[0],
              });
              return;
            }
          } else {
            res.send({
              message: "Email And Password Doesn't Match",
              success: false,
            });
          }
        });
      } else {
        res.send({ message: "Account Is Not Registered", success: false });
      }
    });
  },

  // CHECK LOGIN//
  getDataUser: (req, res) => {
    let scriptQuery = `SELECT * FROM users WHERE idUser=${req.user.idUser};`;
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Failed To Get User Data", error: err });
      } else {
        delete results[0].password;
        var parsed = moment(results[0].dateOfBirth).format("YYYY-MM-DD");
        results = { ...results[0], dateOfBirth: parsed };
        return res.status(200).send(results);
      }

      // console.log(results[0]);
      delete results[0].password;
      if (results[0].dateOfBirth == null) {
        return res.status(200).send(results[0]);
      }
      var parsed = moment(results[0].dateOfBirth).format("YYYY-MM-DD");
      results = { ...results[0], dateOfBirth: parsed };
      return res.status(200).send(results);
    });
  },

  //EDIT DATA USER PROFILE//
  editDataUser: (req, res) => {
    const idUser = req.user.idUser;
    // console.log(idUser);
    let { fullName, username, email, gender, dateOfBirth } = req.body;
    if (dateOfBirth === '') {
      dateOfBirth = null
    }else{
      dateOfBirth = moment(dateOfBirth).format("YYYY-MM-DD"); // ubah format jadi YYYY/MM/DD
    }
    // console.log(dateOfBirth);
    let scriptQuery = `UPDATE users SET
     fullName=${db.escape(fullName)},
     username=${db.escape(username)},
     email=${db.escape(email)},
     gender=${db.escape(gender)},
     dateOfBirth=${db.escape(dateOfBirth)}
     WHERE idUser=${db.escape(idUser)} ;`;
    // console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          error: err
        });
        return;
      } else {
        res.status(200).send(results);
      }
    });
  },

  // //CHANGE PASSWORD//
  changePasswordUser: (req, res) => {
    let { idUser } = req.user;
    let { newPassword, oldPassword } = req.body.data;

    let scriptQuery = `SELECT password FROM users WHERE idUser=${db.escape(
      idUser
    )}`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Data Tidak Ditemukan", success: false, err });
      }

      bcrypt.compare(oldPassword, results[0].password, function (err, isMatch) {
        if (err) {
          return res
            .status(500)
            .send({ message: "Terjadi Kesalahan", success: false, err });
        } else if (!isMatch) {
          return res
            .status(200)
            .send({ message: "Password anda salah", success: false });
        } else {
          //Password match dengan hashing
          //add new password to db
          let { password } = req.body.data;
          bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
              return console.log(error);
            } else {
              password = hash;
              console.log(password);
              //update password
              let updateQuery = `UPDATE users SET password = "${password}" WHERE idUser = ${req.user.idUser};`;
              db.query(updateQuery, (err, results) => {
                if (err) {
                  console.log(err);
                  res
                    .status(500)
                    .send({
                      message: "update password failed",
                      success: false,
                    });
                }
                res
                  .status(200)
                  .send({
                    message: "update password success ✔",
                    success: true,
                  });
              });
            }
          });
        }
      });
    });
  },

  // // FORGOT PASSWORD //
  forgotPassword: (req, res) => {
    //Query
    let selectQuery = `SELECT * FROM users WHERE email =${db.escape(
      req.body.email
    )} ;`;
    db.query(selectQuery, (err, results) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
        return;
      }
      // Check Data User
      if (results.length === 0) {
        res.send({ message: "Email Is Not Registered", success: false });
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
            res
              .status(500)
              .send({ message: "req forgot password failed", success: false });
          }
          res.status(200).send({
            message: "Request Forgot Password Success  ✔",
            success: true,
          });
        });
      }
    });
  },

  // // VERIFICATION AND UPDATE FORGOT //
  verificationF: (req, res) => {
    let newPassword = req.body.newPassword;
    bcrypt.hash(newPassword, saltRounds, (error, hash) => {
      if (error) {
        return console.log(error);
      } else {
        newPassword = hash;
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
      }
    });
  },
};
