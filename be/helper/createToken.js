// Create Token For FrontEnd
const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, "private212", { expiresIn: "12h" });
  },
};
