const User = require('../model/user')


const getAllUsers = async (req,res) => {
    const user =  await User.find()
    if(!user) return res.status(204).json({msg:'users not found'})
    return res.json(user)
  }

  module.exports = getAllUsers