const {Router} = require('express')
const router = Router()
const employee = require('../controlllers/employeeControllers')
const rolesList = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')

const {getAllEmployee,updateEmployee,createNewEmployee, deleteEmployee,getEmployee} = employee

 router.route('/')
 .get(getAllEmployee)
 .post(verifyRoles(rolesList.user,rolesList.editor),createNewEmployee)
 .put(verifyRoles(rolesList.user,rolesList.editor), updateEmployee)
 .delete(verifyRoles(rolesList.admin),deleteEmployee)

 router.route('/:id')
 .get(getEmployee)


module.exports = router