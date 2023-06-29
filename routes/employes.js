const {Router} = require('express')
const router = Router()
const employee = require('../controlllers/employeeControllers')

const {getAllEmployee,updateEmployee,createNewEmployee,deleteEmployee,getEmployee} = employee

 router.route('/')
 .get(getAllEmployee)
 .post(createNewEmployee)
 .put(updateEmployee)
 .delete(deleteEmployee)

 router.route('/:id')
 .get(getEmployee)


module.exports = router