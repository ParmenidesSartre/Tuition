const courseRouter = require('express').Router()
const courseController = require('../controllers/course.controller')

courseRouter.route('/all').get(courseController.getCourses)
courseRouter
  .route('/edit/:id')
  .get(courseController.editCourses)
  .post(courseController.updateCourse)
courseRouter.route('/details/:id').get(courseController.getCourseDetails)
courseRouter.route('/add-course').get(courseController.addCourse).post(courseController.submitCourse)

module.exports = courseRouter
