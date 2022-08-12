import express from "express"
import jsonwebtoken from "jsonwebtoken"
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.validation.js";

mongoose
    .connect('mongodb+srv://miluokee:1864f45T@mnt-estate-db.szaxcaj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Database started on Mongoose'))
    .catch((error) => console.log('Database error', error))

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

const JWT_KEY = 'dd8c9a8fe91c1c9617a7ec78151b05ff'

server.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    res.json({
        success: true
    })
})

server.listen(1864, (err) => {
    if (err) {
        console.log(err)
    } 

    console.log('Server started on http://localhost:1864')
})