const Joi = require("joi");

const messageValidationSchema = Joi.object({
  content: Joi.string().required(),
  sender: Joi.number().integer().required(),
  receiver: Joi.number().integer().required(),
  isRead: Joi.boolean().default(false),
  isDeleteForSender: Joi.boolean().default(false),
  isDeleteForReceiver: Joi.boolean().default(false),
});

module.exports = messageValidationSchema;