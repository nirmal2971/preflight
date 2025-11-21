const Joi = require('joi');

const createSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  description: Joi.string().allow('', null).max(1000),
  priority: Joi.string().valid('low', 'medium', 'high').default('low')
});

const updateSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200),
  description: Joi.string().allow('', null).max(1000),
  priority: Joi.string().valid('low', 'medium', 'high'),
  completed: Joi.boolean()
}).min(1); // at least one field required

module.exports = { createSchema, updateSchema };
