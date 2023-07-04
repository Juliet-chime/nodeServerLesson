
const verifySchema = (schema) => {
    return(req,res,next)=>{
const result = schema.validate(req.body)
const {error} =  result

const message = error?.details.map(i => i.message).join(',');
if(!error){
    next()
} else{
    res.status(404).json({msg:message})
}
    }
}

module.exports = verifySchema