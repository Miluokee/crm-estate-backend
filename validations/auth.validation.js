import { body } from "express-validator";
import * as ValidationHelper from "../helpers/validation.helper.js";

export const registerValidation = [
    body('fullName').isString(),
    body('email').isEmail(),
    body('confirmEmail').custom(ValidationHelper.isEmailSame),
    body('password').isString(),
    body('confirmPassword').custom(ValidationHelper.isPasswordSame),  
    body('phoneNumber').custom(ValidationHelper.isPhoneNumber)
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isString()
]