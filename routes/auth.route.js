const authRouter = require('express').Router()
const authController = require('../controllers/auth.controller')
const mainController = require('../controllers/main.controller');


authRouter.route('/register').get(authController.getRegister).post(authController.postRegister)
authRouter.route('/logout').post(authController.postLogout)
authRouter.route('/login').get(mainController.getLogin).post(mainController.postLogin);


module.exports = authRouter