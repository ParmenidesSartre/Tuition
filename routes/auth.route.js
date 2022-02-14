const authRouter = require('express').Router()
const authController = require('../controllers/auth.controller')


authRouter.route('/register').get(authController.getRegister).post(authController.postRegister)
authRouter.route('/logout').post(authController.postLogout)


module.exports = authRouter