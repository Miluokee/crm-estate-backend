import express from "express"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt";
import mongoose from "mongoose"
import { validationResult } from "express-validator"

import { registerValidation, loginValidation } from "./validations/auth.validation.js"
import { JWT_KEY } from "./helpers/auth.validation.helper.js";
import checkAuth from "./utils/checkAuth.js";

import UserModel from "./models/user.model.js";

mongoose
    .connect('mongodb+srv://miluokee:1864f45T@mnt-estate-db.szaxcaj.mongodb.net/mnt-estate?retryWrites=true&w=majority')
    .then(() => console.log('Database started on Mongoose'))
    .catch((error) => console.log('Database error', error))

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

server.post('/auth/register', registerValidation, async (req, res) => {
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
})

server.post('/auth/login', loginValidation, async (req, res) => {
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
})

server.get('/auth/me', checkAuth, async (req, res) => {
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
})

server.listen(1864, (err) => {
    if (err) {
        console.log(err)
    } 

    console.log('Server started on http://localhost:1864')
})