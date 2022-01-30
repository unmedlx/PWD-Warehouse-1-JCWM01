//Handle Send Verification Email
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "ayyasluthfi@gmail.com", pass: "eoydnxsgrvbndkjb" },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;
