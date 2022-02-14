// Upload data to cloudinary
const DatauriParser = require('datauri/parser')
const cloudinary = require('cloudinary')
const path = require('path')
const parser = new DatauriParser()

// Get data from MongoDB
const Course = require('../models/course.models')
const Tutor = require('../models/tutor.models')
const Student = require('../models/student.models')

// GET all courses
exports.getCourses = async (req, res, next) => {
  const user = await Student.find({_id : req.session.user[0]._id})
  const allCourses = await Course.find({})
  res.render('pages/courses/courses', {
    courses: allCourses,
    user : user
  })
}

// Edit course by Id
exports.editCourses = async (req, res, next) => {
  const user = await Student.find({_id : req.session.user[0]._id})
  const courseDetail = await Course.find({ _id: req.params.id })
  const TutorList = await Tutor.find({})
  res.render('pages/courses/edit-courses', {
    courseDetail: courseDetail,
    tutors: TutorList,
    user : user
  })
}

// GET course details by id
exports.getCourseDetails = async (req, res, next) => {
  const user = await Student.find({_id : req.session.user[0]._id})
  const courseDetail = await Course.find({ _id: req.params.id })
  res.render('pages/courses/about-courses', {
    courseDetail: courseDetail,
    user : user
  })
}

//PUT update course
exports.updateCourse = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, async (result) => {
      req.body.image = result.url
      await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      })
    })
  } else {
    await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
  }
  res.redirect('/courses/all')
}

// GET add course page
exports.addCourse = async (req, res, next) => {
  const TutorList = await Tutor.find({})
  res.render('pages/courses/add-courses', {
    tutors: TutorList,
  })
}

// Post new course
exports.submitCourse = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, (result) => {
      req.body.image = result.url
      const course = new Course(req.body)
      course.save((err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/courses/all')
        }
      })
    })
  } else {
    res.redirect('/courses/all')
  }
}
