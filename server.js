require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnector')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')

const employee = require('./routes/employes')
const registerUser = require('./routes/register')
const loginUser = require('./routes/auth')
const refresh = require('./routes/refresh')
const logout = require('./routes/logout')
const user = require('./routes/user')
const verifyJWT = require('./middleware/verifyJWT')
 
const PORT = 3500

//connect to mongodb
connectDB()

//middleware

app.use(credentials)

app.use(cors(corsOptions))  //cross origin resource sharing

app.use(express.static('./public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

//middleware for cookies

app.use(cookieParser())

app.use('/register', registerUser)
app.use('/login', loginUser)
app.use('/refresh', refresh)
app.use('/logout', logout)
app.use('/users', user)
//protected routes
app.use(verifyJWT)
app.use('/employee', employee) 

mongoose.connection.on('open',()=>{
    console.log('connected to Mongodb')
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    }) 
})

// to generate random access token 
//require('crypto').randomBytes(64).toString('hex')  