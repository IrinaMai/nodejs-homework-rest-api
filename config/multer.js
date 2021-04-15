const path = require('path');
require('dotenv').config();
const { IMG, UPLOAD } = process.env;
const multer = require('multer');

const UPLOAD_DIR = path.join(process.cwd(), UPLOAD);
// const PUBLIC_DIR = path.join(process.cwd(), IMG);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limis: { fileSize: 5048576 }
});

const upload = multer({
  storage: storage,
  limits: 50000000,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    }
    cb(null, false);
  }
});

module.exports = upload;