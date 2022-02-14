const courseRouter = require('express').Router()
const courseController = require('../controllers/course.controller')
const allow = require('../middleware/allow')

courseRouter.route('/all').get(allow,courseController.getCourses)
courseRouter
  .route('/edit/:id')
  .get(allow,courseController.editCourses)
  .post(allow,courseController.updateCourse)
courseRouter.route('/details/:id').get(allow,courseController.getCourseDetails)
courseRouter.route('/add-course').get(allow,courseController.addCourse).post(allow,courseController.submitCourse)

module.exports = courseRouter
