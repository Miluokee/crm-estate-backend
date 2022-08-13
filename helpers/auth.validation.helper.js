import { body } from "express-validator";

export const JWT_KEY = 'dd8c9a8fe91c1c9617a7ec78151b05ff'

export const isPhoneNumber = (param) => {
    const regexp = /(?<!\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[34569]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))/
    return regexp.test(param)
}

export const isEmailSame = () => {
    return body.confirmEmail === body.email
}

export const isPasswordSame = () => {
    return body.confirmPassword === body.password
}