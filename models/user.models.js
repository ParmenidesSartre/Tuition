const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type: String
    },
    tuitionName : {
        type : String,
    },
    mobile : {
        type : String,
    },
    student : {
        type : [{ type : mongoose.Schema.Types.ObjectId, ref: 'student Details' }]
    },
    tutor : {
        type : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Tutor Details' }]
    },
    course : {
        type : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Course Details' }]
    },
    designation : {
        type : String,
        default : 'Admin'
    }
})

module.exports = mongoose.model('User Details', userSchema)