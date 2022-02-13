const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'A student must have a first name']
    },
    lastName : {
        type: String,
        required: [true, 'A student must have a last name'],
    },
    image : {
        type : String,
        required : [true, 'A student must have an image']
    },
    email : {
        type : String,
        required : [true, 'A student must have an email']
    },
    registrationDate : {
        type : Date,
        required : [true, 'A student must have a registration date']
    },
    mobile : {
        type : String,
        required : [true, 'A student must have a mobile number']
    },
    parentMobile : {
        type : String,
        required : [true, "A student must have a parent's mobile number"]
    },
    class : {
        type : [String],
    }
})

module.exports = mongoose.model('student Details', studentSchema )