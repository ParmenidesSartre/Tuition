const User = require('../models/user.models')
const bcrypt = require('bcryptjs')


exports.getLogin = (req, res, next) => {
    res.render('pages/authentication/login')
}

exports.postLogin = async (req, res, next) => {
    const user = await User.find({ email : req.body.email})
    if (user) {
        const isMatch = await bcrypt.compare(req.body.password, user[0].password)
        if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                if (!user[0].firstName) {
                    res.redirect(`/user/edit/${user[0]['_id']}`)
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