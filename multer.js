const multer = require('multer');
const dataUri = require('datauri')

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

module.exports = multerUploads