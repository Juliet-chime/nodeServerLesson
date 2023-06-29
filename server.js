
const path = require('path')
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const employee = require('./routes/employes')
const registerUser = require('./routes/register')
const loginUser = require('./routes/auth')
 

const app = express()

const PORT = 3500

//middleware
app.use(cors())  //cross origin resource sharing

app.use(express.static('./public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use('/employee', employee)
app.use('/register', registerUser)
app.use('/login', loginUser)


//middleware end

app.get('^/$|/index(.html)?',(req,res)=>{
res.sendFile('./views/index.html',{root:__dirname})
})

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
    })
//optional removing .html
app.get('/test(.html)?',(req,res)=>{
    res.sendFile('./views/test.html',{root:__dirname})
    })

    app.get('/old(.html)?',(req,res)=>{
        console.log({res,req,name:'hhf'})
        res.redirect(301,'/test.html')
        })

        //chaning route handlers

        const one = (req,res,next) => {
            console.log('one')
            next()
        }

        const two = (req,res,next) => {
            console.log('two')
            next()
        }

        const three = (req,res,next) => {
            console.log('three ')
          res.send('finish')
        }

        app.get('/chain(.html)?',[one,two,three])

        app.get('/hello(.html)?',(req,res,next)=>{
            next()
            },(req,res)=>{
                res.send('hello html')
            })
//matches any route
        app.get('*',(req,res)=>{
            res.status(404).sendFile('./views/404.html',{root:__dirname})
            })

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`)
}) 

// to generate random access token 
//require('crypto').randomBytes(64).toString('hex')