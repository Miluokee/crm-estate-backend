import express from "express"
import mongoose from "mongoose"

import { registerValidation, loginValidation } from "./validations/auth.validation.js"
import { checkAuthorization } from "./helpers/auth.validation.helper.js";
import { registration, login, getMe } from "./controllers/user.controller.js"

mongoose
    .connect('mongodb+srv://miluokee:1864f45T@mnt-estate-db.szaxcaj.mongodb.net/mnt-estate?retryWrites=true&w=majority')
    .then(() => console.log('Database started on Mongoose'))
    .catch((error) => console.log('Database error', error))

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

server.post('/auth/register', registerValidation, registration)
server.post('/auth/login', loginValidation, login)
server.get('/auth/me', checkAuthorization, getMe)

server.listen(1864, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server started on http://localhost:1864')
})