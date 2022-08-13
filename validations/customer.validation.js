import { body } from "express-validator";
import * as ValidationHelper from "../helpers/auth.validation.helper.js";

export const customerValidation = [
    body('fullName').isLength({ min: 2 }).isString(),
    body('phoneNumber').custom(ValidationHelper.isPhoneNumber)
]