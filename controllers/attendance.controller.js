const Student = require('../models/student.models')

exports.getAttendance = async (req, res) => {
    const user = await Student.find({_id : req.session.user[0]._id})
    res.render('pages/qr-scanner/qr', {
        user : user
    });
}

exports.postAttendance = (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message : 'success'
    })
}