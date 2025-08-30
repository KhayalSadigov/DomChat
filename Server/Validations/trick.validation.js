const Joi = require("joi");

const trickValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string().uri().required(),
});

module.exports = trickValidationSchema;
