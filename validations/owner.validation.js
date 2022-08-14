import { body } from "express-validator"
import * as ValidationHelper from "../helpers/auth.validation.helper.js"

export const ownerValidation = [
    body('fullName').isLength({ min: 3 }).isString(), 
    body('phoneNumber').custom(ValidationHelper.isPhoneNumber)
]