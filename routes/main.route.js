const loginRouter = require('express').Router();
const mainController = require('../controllers/main.controller');

loginRouter.route('').get(mainController.getLogin).post(mainController.postLogin);

module.exports =  loginRouter