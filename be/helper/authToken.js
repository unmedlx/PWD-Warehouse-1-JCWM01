// Decrypt Token From Frontend
const jwt = require("jsonwebtoken");

module.exports = {
  authToken: (req, res, next) => {
    //make sure get the right data

    jwt.verify(req.token, "private212", (err, decode) => {
      if (err) {
        return res.status(401).send(err);
      }
      req.user = decode;

      next();
    });
  },
};
