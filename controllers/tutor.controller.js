// Upload data to cloudinary
const DatauriParser = require('datauri/parser')
const cloudinary = require('cloudinary')
const path = require('path')
const parser = new DatauriParser()

// Get data from MongoDB
const Tutor = require('../models/tutor.models')
const Student = require('../models/student.models')
const Course = require('../models/course.models')
const User = require('../models/user.models')

// GET all tutors
exports.getTutors = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const alltutors = await Tutor.find({_id : {$in : user[0].tutor}})
  res.render('pages/tutors/all-tutors', {
    alltutors: alltutors,
    user,
  })
}

// Edit tutor by Id
exports.editTutors = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const tutorDetail = await Tutor.find({ _id: req.params.id })
  res.render('pages/tutors/edit-tutor', {
    tutorDetail: tutorDetail,
    user,
  })
}

// GET tutor details by id
exports.getTutorDetails = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const tutorDetail = await Tutor.find({ _id: req.params.id })
  const courseTeached = await Course.find({ tutor : tutorDetail[0].firstName.trim() })
  res.render('pages/tutors/about-tutors', {
    tutorDetail: tutorDetail,
    user : user,
    courseTeached: Object.keys(courseTeached).length
  })
}

//PUT update tutor
exports.updateTutor = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, async (result) => {
      req.body.image = result.url
      await Tutor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      })
    })
  } else {
    await Tutor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
  }
  res.redirect('/tutors/all')
}

// GET add tutor page
exports.addTutor = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  res.render('pages/tutors/add-tutor', {
    user,
  })
}

// Post new tutor
exports.submitTutor = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer,
    ).content
    await cloudinary.uploader.upload(file, (result) => {
      req.body.image = result.url
      const tutor = new Tutor(req.body)
      tutor.save((err, result) => {
        if (err) {
          console.log(err)
        } else {
          User.updateOne({ $push: { tutor: [result._id] } }, (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect('/tutors/all')
            }
          })
        }
      })
    })
  } else {
    const tutor = new Tutor(req.body)
    tutor.save( async (error) => {
      if (error) {
        const user = await Student.find({ _id: req.session.user[0]._id })
        res.render('pages/tutors/add-tutor', {
          error: error,
          user : user
        })
      } else {
        res.redirect('/tutors/all')
      }
    })
  }
}
