const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multerUpload = require('./multer')
const cloudinary = require('./cloudinaryConfig')

// Routers
const courseRouter = require('./routes/courses.route');
const tutorRouter = require('./routes/tutors.route');
const studentRouter = require('./routes/students.route');
const authRouter = require('./routes/auth.route');
const mainRouter = require('./routes/main.route');
const attendanceRouter = require('./routes/attendance.route');
const userRouter = require('./routes/user.route')

const User = require('./models/student.models');
// Session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'sessions'
});

// set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/assets'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cloudinary.config);

app.use(
  session({
    secret: 'tuition management system',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Database
const mongoose = require('mongoose')

// Get the database connection
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

// Routes
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/courses', multerUpload, courseRouter);
app.use('/tutors/', multerUpload, tutorRouter);
app.use('/students/', multerUpload, studentRouter);
app.use('/auth', authRouter )
app.use('/user', userRouter);
app.use('/qr', attendanceRouter)
app.use('/', (req, res) => {
  res.render('pages/landing/index')
})


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