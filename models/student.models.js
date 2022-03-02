const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    image : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    registrationDate : {
        type : Date,
    },
    mobile : {
        type : String,
    },
    parentName : {
        type : String,
    },
    parentMobile : {
        type : String,
    },
    class : {
        type : [String],
    },
    password : {
        type : String,
    },
})

module.exports = mongoose.model('student Details', studentSchema )