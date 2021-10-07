// Decrypt Token From Frontend
const jwt = require("jsonwebtoken");

module.exports = {
  authTokenF: (req, res, next) => {
    //make sure get the right data
    // console.log(req.token);

    jwt.verify(req.token, "forgotPass123", (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token Expired", succes: false, error: err });
      }
      req.user = decode;

      // console.log(req.user);

      next();
    });
  },
};
