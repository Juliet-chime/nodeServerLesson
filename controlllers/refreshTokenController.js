const User = require('../model/user')

const jwt = require('jsonwebtoken') 


const handleRefreshToken = async (req, res) => {
     
    const cookies = req.cookies

    if(!cookies?.jwt){
       return res.sendStatus(401 )
    } 

    const refreshToken = cookies?.jwt

    const foundUser = await User.findOne({refreshToken}).exec()

    if(!foundUser){
       return res.sendStatus(403)
    }


//evaluate jwt
 jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decode)=>{
    if(err || foundUser.username !== decode.username) return res.sendStatus(403)

     //checking roles

     const roles = Object.values(foundUser.roles) 

    const accessToken = jwt.sign(
        {
            "userInfo":{
            "username":decode.username,
            "roles":roles
        }
    },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30s'}
    )
    res.json({accessToken,msg:'token refreshed'})
 })

    
}

module.exports = {handleRefreshToken}