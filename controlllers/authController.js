const userDB = {
    users : require('../data/users.json'), 
    setUsers : function(data){this.users = data}
}

const bcrypt = require('bcrypt') 

const handleLogin = async (req, res) => {
     
    const {user,pwd} = req.body 

    if(!user || !pwd){
       return res.status(400).json({message: 'Username and password is required'})
    } 

    const foundUser = userDB.users.find((item)=>item.username === user)

    if(!foundUser){
       return res.status(401).json({message:'user is unauthorised'})
    }

    const matchpwd = await bcrypt.compare(pwd,foundUser.password)

    if(matchpwd){
        //create jwt
        res.json({success : `user ${user} is logged in!`})
    } else{
        res.status(401).json({message:'user is unauthorised'})
    }
}

module.exports = {handleLogin}