//Handle Send Verification Email
const nodemailer = require("nodemailer");
const user = process.env.USER_NODEMAILER;
const password = process.env.pass_NODEMAILER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass: password },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;
