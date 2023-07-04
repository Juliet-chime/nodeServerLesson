
const express = require('express')

const router = express.Router()

const logout =  require('../controlllers/logoutController')

router.get('/',logout.handleLogout)
 
module.exports = router    