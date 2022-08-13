import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt";
import { validationResult } from "express-validator"

import UserModel from "../models/user.model.js";
import { JWT_KEY } from "../helpers/auth.validation.helper.js"

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            phoneNumber: req.body.phoneNumber,
            avatarUrl: req.body.avatarUrl
        })
    
        const user = await doc.save()

        const token = jsonwebtoken.sign(
            {
                _id: user._id
            },
            JWT_KEY,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData } = user._doc
    
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось зареєструватись'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return req.status(404).json({
                message: 'Користувач відсутній'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(403).json({
                message: 'Неравильний логін або пароль'
            })
        }

        const token = jsonwebtoken.sign({
            _id: user._id
        },
        JWT_KEY,
        {
            expiresIn: '30d'
        })

        const { passwordHash, ...userData } = user._doc
    
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось авторизуватись'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if(!user) {
            return res.status(404).json({
                message: 'Користувач не знайдений'
            })
        }

        const { passwordHash, ...userData } = user._doc
    
        res.json(userData)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось авторизуватись'
        })
    }
}