const cloudinary = require('cloudinary')

exports.config = (req, res, next) => {
  cloudinary.config({
    cloud_name: 'dgpwzpczn',
    api_key: '988171741833447',
    api_secret: 'isFUdsIc0P2CG8DdGzEqF4D3K6s',
  })
  next()
}
