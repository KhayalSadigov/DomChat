const trickValidationSchema = require("../Validations/trick.validation");

const trickMiddleware = {
  // Trick validation middleware
  validateTrick: (req, res, next) => {
    const { error } = trickValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};

module.exports = trickMiddleware;