
const express = require('express')

const router = express.Router()

const registerUser =  require('../controlllers/registerController')

router.post('/',registerUser.handleNewUser)
 
module.exports = router 