const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'A tutor must have a first name'],
        unique: true,
    },
    lastName : {
        type: String,
        required: [true, 'A tutor must have a last name'],
    },
    image : {
        type : String,
        required : [true, 'A tutor must have an image']
    },
    email : {
        type : String,
        required : [true, 'A tutor must have an email']
    },
    joiningDate : {
        type : Date,
        required : [true, 'A tutor must have a joining data']
    },
    mobile : {
        type : String,
        required : [true, 'A tutor must have a mobile number']
    },
    rate : {
        type : Number,
    },
    education : {
        type : String,
        required : [true, 'A tutor must have a education details']
    }
})

module.exports = mongoose.model('Tutor Details', tutorSchema )