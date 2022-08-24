import express from "express"
import mongoose from "mongoose"

//Перевірка валідації даних
import { registerValidation, loginValidation } from "./validations/auth.validation.js"
import { customerValidation } from "./validations/customer.validation.js";

//Перевірка авторизації користувача
import { checkAuthorization, handleValidationErrors } from "./helpers/auth.validation.helper.js";

//Підключення контролерів
import { CustomerControllers, UserControllers, RealtyControllers, OwnerControllers } from "./controllers/controllers.js";

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
server.post('/auth/register', registerValidation, UserControllers.registration)
server.post('/auth/login', loginValidation, UserControllers.login)
server.get('/auth/me', checkAuthorization, handleValidationErrors, UserControllers.getMe)

//Роути клієнтів - всі клієнти, конкретний клієнт, додати, видалити,редагувати інформацію про клієнта
server.post('/customers', checkAuthorization, customerValidation, handleValidationErrors, CustomerControllers.addNewCustomer)
server.get('/customers', checkAuthorization, CustomerControllers.getAllCustomers)
server.get('/customers/:id', checkAuthorization, CustomerControllers.getOneCustomer)
server.delete('/customers/:id', checkAuthorization, CustomerControllers.deleteCustomer)
server.patch('/customers/:id', checkAuthorization, customerValidation, CustomerControllers.editCustomerInfo)

//Роути об'єктів нерухомості - отримати всі об'єкти, отримати конкретний об'єкт, додати, видалити, редагувати об'єкт
server.post('/realty', checkAuthorization, RealtyControllers.createRealtyObject)
server.get('/realty', RealtyControllers.getAllRealtyObjects)
server.get('/realty/:id', RealtyControllers.getRealtyObject)
server.delete('/realty/:id', checkAuthorization, RealtyControllers.deleteRealtyObject)
server.patch('/realty/:id', checkAuthorization, RealtyControllers.editRealtyObject)

//Роути власників - всі власники, конкретний власник, додати, видалити,редагувати інформацію про власника
server.get('/owners', checkAuthorization, OwnerControllers.getOwners)
server.get('/owners/:id')
server.delete('/owners/:id')
server.patch('/owners/:id')

//Порт сервера
server.listen(1864, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server started on http://localhost:1864')
})