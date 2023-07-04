const express = require('express')

const router = express.Router()

const user =  require('../controlllers/usersController')

router.get('/',user)
 
module.exports = router 