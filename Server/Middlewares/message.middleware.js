const messageValidationSchema = require("../Validations/message.validation");
const jwt = require("jsonwebtoken");

const messageMiddleware = {
  // Message validation middleware
  validateMessage: (req, res, next) => {
    const { error } = messageValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
  // Token validation middleware
  validateToken: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  }
};

module.exports = messageMiddleware;