const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()
const fs = require('fs').promises
const path = require('path')
const multer = require('multer')
const { DB_URL, CLOUD_NAME, API_KEY, API_SECRET, UPLOAD, IMG } = process.env

const UPLOAD_DIR = path.join(process.cwd(), UPLOAD)
const PUBLIC_DIR = path.join(process.cwd(), IMG)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// const upload = multer({
//   storage: storage
//   // limits: 2000000,
// //   fileFilter: (req, file, cb) => {
// //   if(file.mimetype.includes("image")) {
// //   cb(null, true)
// //   }
// //   cb(null, false)
// // }
//  })

// app.post("/api/upload" , upload.single('file'), async(req, res, next) => {
//   console.log(req.file)
//   console.log(req.body)
//   res.redirect('/')
// })

const PORT = process.env.PORT || 3000

const connection = mongoose.connect(DB_URL, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const isFolder = (folder) => {
  return fs.access(folder).then(() => true).catch(() => false)
}

const createFolder = async (folder) => {
  if (!await isFolder(folder)) {
    await fs.mkdir(folder)
  } else {

  }
}

connection
  .then(() => {
    app.listen(PORT, async () => {
      createFolder(UPLOAD_DIR)
      createFolder(PUBLIC_DIR)
      console.log(
        `Server running. Use API on port: ${PORT}. Database connection successful`
      )
    })
  })
  .catch((error) => {
    console.log(`Server not running. Error: ${error.message}`)
  })
