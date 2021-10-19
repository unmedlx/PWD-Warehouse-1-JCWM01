const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getRevenueYear: (req, res) => {
    res.status(200).send(console.log("halo"));
  },

  getRevenueMonth: (req, res) => {},

  getRevenueDay: (req, res) => {},

  getTransactionStatus: (req, res) => {},

  getDemographic: (req, res) => {},

  getBestSelling: (req, res) => {},
};
