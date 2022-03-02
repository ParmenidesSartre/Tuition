const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')


userRouter
  .route('/edit/:id')
  .get(userController.editUser)
  .post(userController.updateUser)
userRouter.route('/details/:id').get(userController.getUserDetails)

module.exports = userRouter