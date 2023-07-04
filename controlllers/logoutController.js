const User = require('../model/user')

const handleLogout = async (req, res) => {
     
//on client also delete the access token

    const cookies = req.cookies

    if(!cookies?.jwt){
       return res.sendStatus(204)
    } 

//is refresh token in the DB
    const refreshToken = cookies?.jwt

    const foundUser = await User.findOne({refreshToken}).exec()

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000})
       return res.sendStatus(204)
    }
//delete refresh token

foundUser.refreshToken = ''
const result = await foundUser.save()

res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000})
res.status(204).json({result, msg:'Logged out successfully'})
}

module.exports = {handleLogout}