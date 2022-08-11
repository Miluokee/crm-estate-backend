import express from "express"
import jsonwebtoken from "jsonwebtoken"
import mongoose from "mongoose";

mongoose
    .connect('mongodb+srv://miluokee:1864f45T@mnt-estate-db.szaxcaj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Database started on Mongoose'))
    .catch((error) => console.log('Database error', error))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

const JWT_KEY = 'dd8c9a8fe91c1c9617a7ec78151b05ff'

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    const token = jsonwebtoken.sign({
        login: req.body.login,
        password: req.body.password
    }, JWT_KEY)

    res.json({
        success: true,
        token
    })
})

app.listen(1864, (err) => {
    if (err) {
        console.log(err)
    } 

    console.log('Server started on http://localhost:1864')
})