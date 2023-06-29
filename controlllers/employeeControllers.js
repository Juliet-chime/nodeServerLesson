const dataJson = require('../data/data.json')

const data = {
   employee : dataJson,
   setEmployee : function (data) {this.employee = data}
}

const getAllEmployee = (req,res) => {
   return res.json(data.employee)
 }

 const createNewEmployee  = (req,res)=>{
    const {firstname, lastname} = req.body

    const newEmployee = {
      "id": data.employee.length + 1 || 1,
      "firstname": firstname,
      "lastname":lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname){
      return res.status(404).json({message:'First name and last name are required'})
    }
    data.setEmployee([...data.employee, newEmployee])
    res.json(data.employee)
 }

 const updateEmployee  = (req,res)=>{
   const {firstname, lastname,id} = req.body

   const employee = data.employee.find(ems => ems.id === id)
   if (!employee){
      return res.status(404).json({message:`Employee Id ${id} not found`})
    }

    if(firstname) employee.firstName = firstname
    if(lastname) employee.lastName = lastname

    const filteredData = data.employee.filter(item => item.id !== id)

    const unSortedData = [...filteredData,employee]

    const sortedData = unSortedData.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
    data.setEmployee(sortedData)

    res.json(data.employee)
} 

const deleteEmployee  = (req,res)=>{
   const {id} = req.body
   console.log(id)

   const employee = data.employee.find((item)=> item.id === parseInt(id))
   if(!employee){
      res.statu(404).json('id not found')
   }
   const filteredData = data.employee.filter((item)=>item.id !== parseInt(id))
   data.setEmployee([...filteredData]);
   res.json(data.employee); 
} 

const getEmployee  = (req,res) => {
   const {id} = req.params

   const employee = data.employee.find((item)=> item.id === parseInt(id))
   if(!employee){
      res.status(404).json('id not found')
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

 