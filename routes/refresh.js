
const express = require('express')

const router = express.Router()

const refresh =  require('../controlllers/refreshTokenController')

router.get('/',refresh.handleRefreshToken)
 
module.exports = router    