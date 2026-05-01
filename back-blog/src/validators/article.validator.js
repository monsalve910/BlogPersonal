const Joi = require('joi');
const schemas = {
  create: Joi.object({
    titulo: Joi.string().required(),
    contenido: Joi.string().required(),
    fecha: Joi.date().required(),
    imagen: Joi.string().optional(),
    userId: Joi.number().integer().positive().required()
  }),
  update: Joi.object({
    titulo: Joi.string(),
    contenido: Joi.string(),
    fecha: Joi.date(),
    imagen: Joi.string(),
    userId: Joi.number().integer().positive()
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
module.exports = { validateArticle: validate };