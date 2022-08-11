import express from "express"
import jsonwebtoken from "jsonwebtoken"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server started with nodemon')
})

const JWT_TOKEN_KEY = 'dd8c9a8fe91c1c9617a7ec78151b05ff'

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    const token = jsonwebtoken.sign({
        login: req.body.login,
        password: req.body.password
    }, JWT_TOKEN_KEY)

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