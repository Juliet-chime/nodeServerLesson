
const express = require('express')

const router = express.Router()

const loginUser =  require('../controlllers/authController')

router.post('/',loginUser.handleLogin)
 
module.exports = router 