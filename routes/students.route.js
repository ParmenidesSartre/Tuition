const studentRouter = require('express').Router()
const studentController = require('../controllers/student.controller')

studentRouter.route('/all').get(studentController.getStudents)
studentRouter
  .route('/edit/:id')
  .get(studentController.editStudents)
  .post(studentController.updateStudent)
studentRouter.route('/details/:id').get(studentController.getStudentDetails)
studentRouter.route('/add-student').get(studentController.addStudent).post(studentController.submitStudent)

module.exports = studentRouter