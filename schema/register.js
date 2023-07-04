
const Joi = require('joi')

const registerSchema = Joi.object().keys({ 
    user: Joi.string().min(1).max(15).required(), 
    pwd: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required(), 
  });

  module.exports=registerSchema