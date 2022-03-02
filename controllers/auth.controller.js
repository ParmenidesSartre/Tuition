const User = require('../models/user.models')
const bcrypt = require('bcryptjs');


exports.getRegister = (req, res, next) => {
    res.render('pages/authentication/register')
}

exports.postRegister = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const account = await User.findOne({email : email})
    if (account) {
        res.redirect('/', {
            error: 'Account already exists'
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newAccount = new User({
            email : email,
            password : hashedPassword,
            registrationDate : new Date().toISOString(),
            designation : 'Admin'
        })
        newAccount.save((err, result ) => {
            if (err) {
                res.redirect('/auth/register', {
                    error : err
                })
            } else {
                res.redirect('/auth/login')
            }
        })
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/auth/login')
    })
    
}

