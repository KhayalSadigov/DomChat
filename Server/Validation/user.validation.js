// User Valiodation Schema
const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  verify: Joi.boolean().default(false),
});

module.exports = userValidationSchema;
