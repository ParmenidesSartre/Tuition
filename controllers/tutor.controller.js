// Upload data to cloudinary
const DatauriParser = require('datauri/parser')
const cloudinary = require('cloudinary')
const path = require('path')
const parser = new DatauriParser()

// Get data from MongoDB
const Tutor = require('../models/tutor.models')

// GET all tutors
exports.getTutors = async (req, res, next) => {
  const alltutors = await Tutor.find({})
  res.render('pages/tutors/all-tutors', {
    alltutors: alltutors,
  })
}

// Edit tutor by Id
exports.editTutors = async (req, res, next) => {
  const tutorDetail = await Tutor.find({ _id: req.params.id })
  res.render('pages/tutors/edit-tutor', {
    tutorDetail: tutorDetail,
  })
}

// GET tutor details by id
exports.getTutorDetails = async (req, res, next) => {
  const tutorDetail = await Tutor.find({ _id: req.params.id })
  res.render('pages/tutors/about-tutors', {
    tutorDetail: tutorDetail,
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
exports.addTutor = (req, res, next) => {
  res.render('pages/tutors/add-tutor')
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
          res.redirect('/tutors/all')
        }
      })
    })
  } else {
    console.log('No file')
    res.redirect('/tutors/all')
  }
  
}
