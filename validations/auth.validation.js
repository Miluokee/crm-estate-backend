import { body } from "express-validator";
import * as ValidationHelper from "../helpers/auth.validation.helper.js";

export const registerValidation = [
    body('fullName').isLength({ min: 3 }).isString(),
    body('email').isEmail(),
    body('confirmEmail').custom(ValidationHelper.isEmailSame),
    body('password').isString().isLength({ min: 8 }),
    body('confirmPassword').custom(ValidationHelper.isPasswordSame),  
    body('phoneNumber').custom(ValidationHelper.isPhoneNumber)
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }).isString()
]