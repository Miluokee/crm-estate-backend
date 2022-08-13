import jsonwebtoken from "jsonwebtoken";
import { JWT_KEY } from "../helpers/auth.validation.helper.js";

export default (req, res, next) => {
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