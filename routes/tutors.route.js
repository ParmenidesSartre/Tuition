const tutorRouter = require('express').Router()
const tutorController = require('../controllers/tutor.controller')

tutorRouter.route('/all').get(tutorController.getTutors)
tutorRouter
  .route('/edit/:id')
  .get(tutorController.editTutors)
  .post(tutorController.updateTutor)
tutorRouter.route('/details/:id').get(tutorController.getTutorDetails)
tutorRouter.route('/add-tutor').get(tutorController.addTutor).post(tutorController.submitTutor)

module.exports = tutorRouter