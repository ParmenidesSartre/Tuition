const Student = require('../models/student.models')
const bcrypt = require('bcryptjs')


exports.getLogin = (req, res, next) => {
    res.render('pages/authentication/login')
}

exports.postLogin = async (req, res, next) => {
    const student = await Student.find({ email : req.body.email})
    if (student) {
        if (bcrypt.compare( req.body.password, student[0].password)) {
            req.session.isLoggedIn = true;
            req.session.user = student;
            req.session.save((err) => {
                if (!student[0].firstName) {
                    res.redirect(`/students/edit/${student[0]['_id']}`)
                } else {
                    res.redirect('/courses/all')
                }
            })

        } else {
            res.render('pages/authentication/login',{
                error: 'Invalid Email or Password'
            })
        }
    } else {
        res.render('pages/authentication/login',{
            error: 'Invalid Email or Password'
        })
    }
}