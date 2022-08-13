import express from "express"
import mongoose from "mongoose"

//Перевірка валідації даних
import { registerValidation, loginValidation } from "./validations/auth.validation.js"

//Перевірка авторизації користувача
import { checkAuthorization } from "./helpers/auth.validation.helper.js";

//Підключення контролерів
import { registration, login, getMe } from "./controllers/user.controller.js"

//Підключення бази даних
mongoose
    .connect('mongodb+srv://miluokee:1864f45T@mnt-estate-db.szaxcaj.mongodb.net/mnt-estate?retryWrites=true&w=majority')
    .then(() => console.log('Database started on Mongoose'))
    .catch((error) => console.log('Database error', error))

//Підключення сервера
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

//Роути користувача - реєстрація, логін, відображення даних
server.post('/auth/register', registerValidation, registration)
server.post('/auth/login', loginValidation, login)
server.get('/auth/me', checkAuthorization, getMe)

//Роути клієнтів - всі клієнти, конкретний клієнт, додати, видалити,редагувати інформацію про клієнта
server.post('/customer')
server.get('/customers')
server.get('/customer/:id')
server.delete('/customer/:id')
server.patch('/customer/:id')

//Роути об'єктів нерухомості - отримати всі об'єкти, отримати конкретний об'єкт, додати, видалити, редагувати об'єкт
server.get('/realty')
server.get('/realty/:id')
server.post('/realty')
server.delete('/realty/:id')
server.patch('/realty/:id')

//Порт сервера
server.listen(1864, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server started on http://localhost:1864')
})