import Joi from "joi";

export const addPartSchema = Joi.object({
  name: Joi.string().trim().lowercase().required().messages({
    "string.empty": "Part name is required",
    "any.required": "Part name is required",
  }),

  recommendedChangeInterval: Joi.object({
    months: Joi.number().min(0).messages({
      "number.base": "Months must be a number",
      "number.min": "Months cannot be negative",
    }),

    miles: Joi.number().min(0).messages({
      "number.base": "Miles must be a number",
      "number.min": "Miles cannot be negative",
    }),
  })
    .required()
    .or("months", "miles")
    .messages({
      "object.missing": "At least one of months or miles must be provided",
    }),

  lastChangeDate: Joi.date().max("now").required().messages({
    "date.base": "Last change date must be a valid date",
    "date.max": "Last change date cannot be in the future",
    "any.required": "Last change date is required",
  }),

  lastChangeMileage: Joi.number().min(0).required().messages({
    "number.base": "Mileage must be a number",
    "number.min": "Mileage cannot be negative",
    "any.required": "Last change mileage is required",
  }),
});

export const editPartSchema = Joi.object({
  name: Joi.string().trim().lowercase().messages({
    "string.empty": "Part name cannot be empty",
  }),

  recommendedChangeInterval: Joi.object({
    months: Joi.number().min(0).messages({
      "number.base": "Months must be a number",
      "number.min": "Months cannot be negative",
    }),

    miles: Joi.number().min(0).messages({
      "number.base": "Miles must be a number",
      "number.min": "Miles cannot be negative",
    }),
  })
    .or("months", "miles")
    .messages({
      "object.missing": "At least one of months or miles must be provided",
    }),

  lastChangeDate: Joi.date().max("now").messages({
    "date.base": "Last change date must be a valid date",
    "date.max": "Last change date cannot be in the future",
  }),

  lastChangeMileage: Joi.number().min(0).messages({
    "number.base": "Mileage must be a number",
    "number.min": "Mileage cannot be negative",
  }),
}).min(1);
