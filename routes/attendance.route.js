const attendanceRouter = require('express').Router()
const attendanceController = require('../controllers/attendance.controller')

attendanceRouter.route('').get(attendanceController.getAttendance).post(attendanceController.postAttendance)


module.exports = attendanceRouter

