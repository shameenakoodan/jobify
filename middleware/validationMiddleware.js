import { body,param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose, { Mongoose } from "mongoose";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
/*export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3,max:50 })
    .withMessage("name must be between 3 and 50 characters long"),
]);
*/
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('jobLocation').notEmpty().withMessage('Job Location is required'),
  body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage("Invalid type value"),

]);
export const validateIdParam = withValidationErrors([
  param('id').custom((value)=>mongoose.Types.ObjectId.isValid(value)).withMessage('invalid MongoDB id')
])