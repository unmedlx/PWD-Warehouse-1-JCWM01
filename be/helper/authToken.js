// Decrypt Token From Frontend
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    //make sure get the right data
    console.log(req.token);

    jwt.verify(req.token, "private212", (err, decode) => {
      if (err) {
        return res.status(401).send(err);
      }
      req.user = decode;

      next();
    });
  },
};
