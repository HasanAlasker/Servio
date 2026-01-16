import Joi from 'joi';

// Validation for time format (HH:MM)
const timeSchema = Joi.string()
  .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
  .messages({
    'string.pattern.base': 'Time must be in HH:MM format (e.g., 09:00, 14:30)',
  });

// Validation for a single day's hours
const dayHoursSchema = Joi.object({
  isOpen: Joi.boolean().required(),
  from: Joi.when('isOpen', {
    is: true,
    then: timeSchema.required(),
    otherwise: Joi.string().allow('', null).optional(),
  }),
  to: Joi.when('isOpen', {
    is: true,
    then: timeSchema.required(),
    otherwise: Joi.string().allow('', null).optional(),
  }),
}).custom((value, helpers) => {
  // Validate that 'from' is before 'to' when open
  if (value.isOpen && value.from && value.to) {
    const [fromH, fromM] = value.from.split(':').map(Number);
    const [toH, toM] = value.to.split(':').map(Number);
    
    const fromMinutes = fromH * 60 + fromM;
    const toMinutes = toH * 60 + toM;
    
    if (fromMinutes >= toMinutes) {
      return helpers.error('any.custom', {
        message: 'Opening time must be before closing time',
      });
    }
  }
  return value;
});

export const addShopSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(25)
    .pattern(/^[a-zA-Z\s'-]+$/)
    .required()
    .messages({
      'string.empty': 'Shop name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': "Name can't be longer than 25 characters",
      'string.pattern.base': 'Please enter a valid name',
      'any.required': 'Shop name is required',
    }),
  
  services: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Services must be an array',
      'array.min': 'At least one service is required',
      'any.required': 'Services are required',
    }),
  
  addresses: Joi.array()
    .items(
      Joi.object({
        city: Joi.string().trim().required().messages({
          'string.empty': 'City is required',
          'any.required': 'City is required',
        }),
        area: Joi.string().trim().required().messages({
          'string.empty': 'Area is required',
          'any.required': 'Area is required',
        }),
        street: Joi.string().trim().required().messages({
          'string.empty': 'Street is required',
          'any.required': 'Street is required',
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Addresses must be an array',
      'array.min': 'At least one address is required',
      'any.required': 'Addresses are required',
    }),
  
  openHours: Joi.object({
    sun: dayHoursSchema.required(),
    mon: dayHoursSchema.required(),
    tue: dayHoursSchema.required(),
    wed: dayHoursSchema.required(),
    thu: dayHoursSchema.required(),
    fri: dayHoursSchema.required(),
    sat: dayHoursSchema.required(),
  }).required().messages({
    'any.required': 'Open hours for all days are required',
  }),
});

export const editShopSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(25)
    .pattern(/^[a-zA-Z\s'-]+$/)
    .messages({
      'string.empty': 'Shop name cannot be empty',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': "Name can't be longer than 25 characters",
      'string.pattern.base': 'Please enter a valid name',
    }),
  
  services: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
      })
    )
    .min(1)
    .messages({
      'array.base': 'Services must be an array',
      'array.min': 'At least one service is required',
    }),
  
  addresses: Joi.array()
    .items(
      Joi.object({
        city: Joi.string().trim().required().messages({
          'string.empty': 'City is required',
          'any.required': 'City is required',
        }),
        area: Joi.string().trim().required().messages({
          'string.empty': 'Area is required',
          'any.required': 'Area is required',
        }),
        street: Joi.string().trim().required().messages({
          'string.empty': 'Street is required',
          'any.required': 'Street is required',
        }),
      })
    )
    .min(1)
    .messages({
      'array.base': 'Addresses must be an array',
      'array.min': 'At least one address is required',
    }),
  
  openHours: Joi.object({
    sun: dayHoursSchema,
    mon: dayHoursSchema,
    tue: dayHoursSchema,
    wed: dayHoursSchema,
    thu: dayHoursSchema,
    fri: dayHoursSchema,
    sat: dayHoursSchema,
  }),
}).min(1);