// Upload data to cloudinary
const DatauriParser = require('datauri/parser')
const cloudinary = require('cloudinary')
const path = require('path')
const parser = new DatauriParser()

// Get data from MongoDB
const Student = require('../models/student.models')
const Course = require('../models/course.models')
const User = require('../models/user.models')

// GET all student
exports.getStudents = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const allStudents = await Student.find({ _id: { $in: user[0].student } })
  res.render('pages/students/all-students', {
    allStudents: allStudents,
    user: user,
  })
}

// Edit student by Id
exports.editStudents = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const studentDetail = await Student.find({ _id: req.params.id })
  const allCourses = await Course.find({ _id: { $in: user[0].course } })
  res.render('pages/students/edit-student', {
    studentDetail: studentDetail,
    user: user,
    allCourses: allCourses,
  })
}

// GET student details by id
exports.getStudentDetails = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const studentDetail = await Student.find({ _id: req.params.id })
  res.render('pages/students/about-student', {
    studentDetail: studentDetail,
    user: user,
  })
}

//PUT update tutor
exports.updateStudent = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, async (result) => {
      req.body.image = result.url
      await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      })
    })
  } else {
    // TODO: check if student has taken a class
    await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
  }
  res.redirect('/students/all')
}

// GET add student page
exports.addStudent = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const allCourses = await Course.find({ _id: { $in: user[0].course } })
  res.render('pages/students/add-student', {
    user,
    allCourses,
  })
}

// Post new student
exports.submitStudent = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, (result) => {
      req.body.image = result.url
      const student = new Student(req.body)
      student.save((err, result) => {
        if (err) {
          console.log(err)
        } else {
          User.updateOne(
            { $push: { student: [result._id] } },
            (err, result) => {
              if (err) {
                console.log(err)
              } else {
                Course.updateOne(
                  { $push: { student: [result.class] } },
                  (err, result) => {
                    if (error) {
                      console.log(error)
                    } else {
                      res.redirect('/students/all')
                    }
                  },
                )
              }
            },
          )
        }
      })
    })
  } else {
    res.redirect('/students/all')
  }
}
