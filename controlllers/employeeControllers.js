
const Employee = require('../model/employee')

const getAllEmployee = async (req,res) => {
   const employee =  await Employee.find()
   if(!employee) return res.status(204).json({msg:'employees not found'})
   return res.json(employee)
 }

 const createNewEmployee  = async (req,res)=>{
    const {firstname, lastname} = req.body

    if (!firstname || !lastname){
      return res.status(400).json({message:'First name and last name are required'})
    }

    const duplicate = await Employee.findOne({firstname}).exec()

    if(duplicate) return res.status(409).json({message:'employee already exist'})

    try {
const result = await Employee.create({
   "firstname": firstname,
   "lastname":lastname,
 })
 res.status(201).json({msg:"employee created successfully",result})
    } catch(err){
console.log(err)
    }
 }

 const updateEmployee  = async (req,res)=>{
   const {firstname, lastname,id} = req?.body

   if(!id){
      res.status(400).json({msg:`id required`})
   }

   const employee = await Employee.findOne({_id:id}).exec()
   if (!employee){
      return res.status(204).json({message:`Employee Id ${id} not found`})
    }

    if(firstname) employee.firstname = firstname
    if(lastname) employee.lastname = lastname

    const result = await employee.save()
    res.json(result)
} 

const deleteEmployee  = async (req,res)=>{
   const {id} = req?.body
   
   if(!id){
      res.status(400).json({msg:`id required`})
   }
   const employee = await Employee.findOne({_id:id}).exec()
   if(!employee){
      res.status(404).json('id not found')
   }

   const result = await employee.deleteOne({_id:id})
   res.json(result); 
} 

const getEmployee  = async (req,res) => {
   const {id} = req?.params

   if(!id){
      res.status(400).json({msg:`id required`})
   }

   const employee = await Employee.findOne({_id:id}).exec()
   if(!employee){
      res.status(404).json('employee not found')
   }
   res.json(employee)
} 

module.exports = {
   getAllEmployee,
   createNewEmployee,
   updateEmployee,
   deleteEmployee,
   getEmployee
}

 