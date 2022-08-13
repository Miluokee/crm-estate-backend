import { body } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import { validationResult } from "express-validator"

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

export const checkAuthorization = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jsonwebtoken.verify(token, JWT_KEY)
            req.userId = decoded._id
            next()
        } catch (error) {
            return res.status(403).json({
                message: 'Відмовлено в доступі'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Відмовлено в доступі'
        })
    }
}

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    next()
}