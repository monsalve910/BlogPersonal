const Joi = require('joi');
const schemas = {
  create: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  update: Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    password: Joi.string().min(6)
  })
};

function validate(kind) {
  const schema = schemas[kind];
  return (req, res, next) => {
    const { error } = schema.validate(req.body || {});
    if (error) {
      return res.status(400).json({ status: 'error', message: error.details[0].message, contador: 0, articulos: [] });
    }
    next();
  };
}
module.exports = { validateUser: validate };