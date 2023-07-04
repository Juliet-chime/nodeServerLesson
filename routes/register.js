
const express = require('express')

const router = express.Router()

const registerUser =  require('../controlllers/registerController')
const verifySchema = require('../middleware/verifySchema')
const registerSchema = require('../schema/register')

router.post('/',verifySchema(registerSchema),registerUser.handleNewUser)
 
module.exports = router 