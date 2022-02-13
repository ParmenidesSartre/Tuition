// Upload data to cloudinary
const DatauriParser = require('datauri/parser')
const cloudinary = require('cloudinary')
const path = require('path')
const parser = new DatauriParser()

// Get data from MongoDB
const Student = require('../models/student.models')

// GET all tutors
exports.getStudents = async (req, res, next) => {
  const allStudents = await Student.find({})
  res.render('pages/students/all-students', {
    allStudents: allStudents,
  })
}

// Edit tutor by Id
exports.editStudents = async (req, res, next) => {
  const studentDetail = await Student.find({ _id: req.params.id })
  res.render('pages/students/edit-student', {
    studentDetail: studentDetail,
  })
}

// GET tutor details by id
exports.getStudentDetails = async (req, res, next) => {
  const studentDetail = await Student.find({ _id: req.params.id })
  res.render('pages/students/about-student', {
    studentDetail: studentDetail,
  })
}

//PUT update tutor
exports.updateStudent= async (req, res, next) => {
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
    await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
  }
  res.redirect('/students/all')
}

// GET add tutor page
exports.addStudent = (req, res, next) => {
  res.render('pages/students/add-student')
}

// Post new tutor
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
          res.redirect('/students/all')
        }
      })
    })
  } else {
    console.log('No file')
    res.redirect('/students/all')
  }
  
}
