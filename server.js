const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multerUpload = require('./multer')
const cloudinary = require('./cloudinaryConfig')

// Routers
const courseRouter = require('./routes/courses.route');
const tutorRouter = require('./routes/tutors.route');
const studentRouter = require('./routes/students.route');

// set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cloudinary.config);

// Database
const mongoose = require('mongoose')

// Get the database connection
const dotenv = require('dotenv');
const res = require('express/lib/response');
dotenv.config({ path: './config.env' })

// Routes
app.use('/', () => {
  res.redirect('/courses/all');
})
app.use('/courses', multerUpload, courseRouter);
app.use('/tutors/', multerUpload, tutorRouter);
app.use('/students/', multerUpload, studentRouter);

// Connecting to the database
const db = process.env.DATABASE
try {
    mongoose.connect(db, {
      useNewUrlParser: true
    }).then(() => console.log('DB connection successful'))
  } catch (error) {
      console.log(error)
    console.log('Failure to connect to database')
  }

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
})