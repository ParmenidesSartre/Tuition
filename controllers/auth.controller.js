const Auth = require('../models/student.models')
const bcrypt = require('bcryptjs');


exports.getRegister = (req, res, next) => {
    res.render('pages/authentication/register')
}

exports.postRegister = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const account = await Auth.findOne({email : email})
    if (account) {
        res.redirect('/', {
            error: 'Account already exists'
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newAccount = new Auth({
            email : email,
            password : hashedPassword,
            registrationDate : new Date().toISOString(),
            designation : 'Student'
        })
        newAccount.save((err, result ) => {
            if (err) {
                res.redirect('/auth/register', {
                    error : err
                })
            } else {
                res.redirect('/')
            }
        })
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
    
}