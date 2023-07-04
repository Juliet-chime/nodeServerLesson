
const verifyRoles = (...allowedRoles) => {
 return (req,res,next)=>{
if(!req?.roles) return res.sendStatus(405)
const rolesArray = [...allowedRoles]

const result = req.roles.map(role => rolesArray.includes(role)).find(res => res === true)

if(!result) return res.sendStatus(401)
next();
}
}

module.exports = verifyRoles