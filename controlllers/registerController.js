
const userDB = {
    users : require('../data/users.json'), 
    setUsers : function(data){this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path') 
const bcrypt = require('bcrypt') 

const handleNewUser = async (req, res) => {
    
    const {user,pwd} = req.body 

    if(!user || !pwd){
       return res.status(400).json({message: 'Username and password is required'})
    }  
    
    const duplicate = userDB.users.find((item)=>item.username === user)

    if(duplicate){
       return res.status(409).json({message:'user already exist'})
    }

    try{
          const hashpassword = await bcrypt.hash(pwd,10)

          const newUser = {username:user,password:hashpassword}  

          userDB.setUsers([...userDB.users,newUser])

          await fsPromises.writeFile(path.join(__dirname,'..','data','users.json'),JSON.stringify(userDB.users )) 

          res.status(201).json({success: `new user ${user} created `})

    } catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={handleNewUser}