
const User = require('../model/user')
const bcrypt = require('bcrypt') 

const handleNewUser = async (req, res) => {
    
    const {user,pwd} = req.body 

    if(!user || !pwd){
       return res.status(400).json({message: 'Username and password is required'})
    }  
    //find duplicate user with mongoose
    const duplicate = await User.findOne({username:user}).exec()

    if(duplicate){
       return res.status(409).json({message:'user already exist'})
    }

    try{
          const hashpassword = await bcrypt.hash(pwd,10)
          //create and store new user with mongoose
          const result = await User.create({
            "username":user,
            "password":hashpassword
        } )  

          res.status(201).json({success: `new user ${user} created `,result})

    } catch(err){
         res.status(500).json({message:err.message})
    }
}

module.exports={handleNewUser}