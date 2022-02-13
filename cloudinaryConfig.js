const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })


exports.config = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  })
  next()
}
