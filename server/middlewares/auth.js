const { tokenVerifier } = require("../helpers/jsonwebtoken");

const auth = (req, res, next) => {
  const access_token = req.headers.access_token;

  if (access_token) {
    try {
      let verifyToken = tokenVerifier(access_token);
      req.accountData = verifyToken;
      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Token not authenticated!",
      });
    }
  } else {
    res.status(404).json({
      status: false,
      message: "Access token not found!",
    });
  }
};

module.exports = auth;
