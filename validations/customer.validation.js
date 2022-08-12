import { body } from "epress-validator";

export const customerValidation = [
    body('fullName').isString(),
    body('phoneNumber').isString()
]