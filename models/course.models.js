const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    code : {
        type: String,
        required: [true, 'A course must have a code'],
    },
    name : {
        type: String,
        required: [true, 'A course must have a name'],
    },
    image : {
        type : String,
        required : [true, 'A course must have an image']
    },
    description : {
        type : String,
        required : [true, 'A course must have a description']
    },
    tutor : {
        type : String,
        required : [true, 'A course must have a tutor']
    },
    price : {
        type : Number,
        required : [true, 'A course must have a price']
    },
    students : {
        type : Number,
    }
})

module.exports = mongoose.model('Course Details', courseSchema )