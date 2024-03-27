// middleware/validateItemSchema.js
const Joi = require('@hapi/joi');
const { itemSchema } = require('../validator'); // Importa el esquema de validación desde validator.js

// Middleware para validar los datos del request contra el esquema definido en Joi
const validateItemSchema = (req, res, next) => {
    const { error } = itemSchema.validate(req.body,{stripUnknown: true, abortEarly: false});
    if (error) {
      return res.status(422).json({
          errors: error.details.map((err)=> err.message)
      })
    } else {
      next(); // Llama al siguiente middleware en la cadena de middleware
    }
  };
  

module.exports = validateItemSchema;
