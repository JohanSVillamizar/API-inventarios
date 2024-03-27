const Joi = require('@hapi/joi');
const locationRegex = /^Pasillo [A-Z], Estantería \d+$/;

const itemSchema = Joi.object({ 
  name: Joi.string().required().messages({
      "string.base": `"name" debe ser una cadena de texto`,
      "any.required": `"name" es un campo requerido`
    }),
  description: Joi.string().optional().messages({
      "string.base": `"description" debe ser una cadena de texto opcional`
    }),
  quantity: Joi.number().integer().min(1).required().messages({
      "number.base": `"quantity" debe ser un número`,
      "number.integer": `"quantity" debe ser un número entero`,
      "number.min": `"quantity" debe ser mayor o igual a 1`,
      "any.required": `"quantity" es un campo requerido`
    }),
  location: Joi.string().trim().regex(locationRegex).required().messages({ 
    "string.base": `"location" debe ser una cadena de texto`,
      "string.empty": `"location" no puede estar vacío`,
      "string.pattern.base": `"location" no cumple con el formato esperado (Pasillo X, Estantería #) donde X es una letra mayúscula y # un número`,
      "any.required": `"location" es un campo requerido`
    }), 
  brand: Joi.string().required().messages({
      "string.base": `"brand" debe ser una cadena de texto`,
      "string.empty": `"brand" no puede estar vacío`,
      "any.required": `"brand" es un campo requerido`
    }),
  price: Joi.number().precision(2).positive().required().messages({
      "number.base": `"price" debe ser un número`,
      "number.precision": `"price" debe tener una precisión de 2 decimales`,
      "number.positive": `"price" debe ser un número positivo`,
      "any.required": `"price" es un campo requerido`
    }),
  entry_date: Joi.string().isoDate().required().messages({
      "string.base": `"entry_date" debe ser una cadena de texto`,
      "string.empty": `"entry_date" no puede estar vacío`,
      "string.isoDate": `"entry_date" debe estar en formato de fecha ISO 8601 válido`,
      "any.required": `"entry_date" es un campo requerido`
    }),
  }).required();

module.exports = { itemSchema };


