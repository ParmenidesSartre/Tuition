// Get data from MongoDB
const User = require('../models/user.models')

// Edit user by Id
exports.editUser = async (req, res, next) => {
  const user = await User.find({ _id: req.session.user[0]._id })
  const userDetail = await User.find({ _id: req.params.id })
  res.render('pages/users/edit-user', {
    userDetail: userDetail,
    user,
  })
}

//PUT update tutor
exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      useFindAndModify: false,
    },
    (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('redirecting')
        res.redirect('/courses/all')
      }
      
    },
  )
}


// GET user details by id
exports.getUserDetails = async (req, res, next) => {
  const user = await User.find({_id : req.session.user[0]._id})
  const studentNumber = user[0].student.length
  const coursesNumber = user[0].course.length
  const tutorsNumber = user[0].tutor.length
  res.render('pages/users/about-user', {
    user : user,
    studentNumber : studentNumber,
    coursesNumber : coursesNumber,
    tutorsNumber : tutorsNumber
  })
}