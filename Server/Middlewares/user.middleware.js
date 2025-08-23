const userValidationSchema = require("../Validations/user.validation");

const userMiddleware = {
  // Validate using Joi schema
  register: (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
  // Validate request body for login
  login: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    next();
  }
};

module.exports = userMiddleware;
