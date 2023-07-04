const User = require('../model/user')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

const handleLogin = async (req, res) => {
     
    const {user,pwd} = req.body 

    if(!user || !pwd){
       return res.status(400).json({message: 'Username and password is required'})
    } 
//find an existing user

    const foundUser = await User.findOne({username:user}).exec()

    if(!foundUser){
       return res.status(401).json({message:'user is unauthorised'})
    }
//compare user password
    const matchpwd = await bcrypt.compare(pwd,foundUser.password)

    if(matchpwd){
//checking roles

const userRole = foundUser.roles
const roles = Object.values(userRole).filter((x) => x !== undefined)

        //create jwt

        const accessToken = jwt.sign({
           "userInfo":{
            "username":foundUser.username,
            "roles":roles
           }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
        const refreshToken = jwt.sign({username:foundUser.username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})

         //saving refresh token to the current user
        foundUser.refreshToken = refreshToken
        //save user
      const result = await foundUser.save()

//sending refresh token as cookie

        res.cookie('jwt',refreshToken,{httpOnly:true, sameSite:'None',secure:true, maxAge:24*60*60*1000})
        res.json({success : `user ${user} is logged in!`,accessToken,result})
    } else{
        res.status(401).json({message:'user is unauthorised'})
    }
}

module.exports = {handleLogin}