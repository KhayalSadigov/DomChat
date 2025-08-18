const userValidationSchema = require("../Validation/user.validation");

const userMiddleware = {
  register: (req, res, next) => {
    // Validate request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    // Validate using Joi schema
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
  login: (req, res, next) => {
    // Validate request body for login
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    next();
  }
};

module.exports = userMiddleware;
