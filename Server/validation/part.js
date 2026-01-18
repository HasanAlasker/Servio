import Joi from 'joi';

const VALID_PART_NAMES = [
  'engine oil',
  'oil filter',
  'air filter',
  'brake pads',
  'brake fluid',
  'coolant',
  'transmission fluid',
  'spark plugs',
  'battery',
  'tires',
  'timing belt',
  'wiper blades',
];

export const addPartSchema = Joi.object({
  // car: Joi.string()
  //   .pattern(/^[0-9a-fA-F]{24}$/)
  //   .required()
  //   .messages({
  //     'string.pattern.base': 'Invalid car ID format',
  //     'any.required': 'Car ID is required',
  //   }),
  
  name: Joi.string()
    .trim()
    .lowercase()
    .valid(...VALID_PART_NAMES)
    .required()
    .messages({
      'string.empty': 'Part name is required',
      'any.only': `Part name must be one of: ${VALID_PART_NAMES.join(', ')}`,
      'any.required': 'Part name is required',
    }),
  
  recommendedChangeInterval: Joi.object({
    months: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Months must be a number',
        'number.min': 'Months cannot be negative',
      }),
    
    miles: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Miles must be a number',
        'number.min': 'Miles cannot be negative',
      }),
  }).required()
    .or('months', 'miles')
    .messages({
      'object.missing': 'At least one of months or miles must be provided',
    }),
  
  lastChangeDate: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'Last change date must be a valid date',
      'date.max': 'Last change date cannot be in the future',
      'any.required': 'Last change date is required',
    }),
  
  lastChangeMileage: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Mileage must be a number',
      'number.min': 'Mileage cannot be negative',
      'any.required': 'Last change mileage is required',
    }),
});

export const editPartSchema = Joi.object({
  name: Joi.string()
    .trim()
    .lowercase()
    .valid(...VALID_PART_NAMES)
    .messages({
      'string.empty': 'Part name cannot be empty',
      'any.only': `Part name must be one of: ${VALID_PART_NAMES.join(', ')}`,
    }),
  
  recommendedChangeInterval: Joi.object({
    months: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Months must be a number',
        'number.min': 'Months cannot be negative',
      }),
    
    miles: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Miles must be a number',
        'number.min': 'Miles cannot be negative',
      }),
  })
    .or('months', 'miles')
    .messages({
      'object.missing': 'At least one of months or miles must be provided',
    }),
  
  lastChangeDate: Joi.date()
    .max('now')
    .messages({
      'date.base': 'Last change date must be a valid date',
      'date.max': 'Last change date cannot be in the future',
    }),
  
  lastChangeMileage: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Mileage must be a number',
      'number.min': 'Mileage cannot be negative',
    }),
}).min(1);