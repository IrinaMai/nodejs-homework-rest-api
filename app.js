const express = require('express')
const Jimp = require('jimp')
const fs = require("fs").promises
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require("path")
require('dotenv').config()
const sharp = require('sharp');
const { IMG, UPLOAD } = process.env
const multer = require('multer')

const UPLOAD_DIR = path.join(process.cwd(), UPLOAD)
const PUBLIC_DIR = path.join(process.cwd(), IMG)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  limis: {fileSize: 10048576 },
})

const upload = multer({ 
  storage: storage, 
  limits: 10000000, 
  fileFilter: (req, file, cb) => {
  if(file.mimetype.includes("image")) {
  cb(null, true)
  }
  cb(null, false)
}
 })

const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
})

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use(express.static(PUBLIC_DIR));

app.post("/api/upload" , upload.single('avatar'), async(req, res, next) => {
if(req.file) {
  // await sharp(req.file.path).resize(250)
  const img = Jimp.read(req.file.path)
  img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE ).writeAsync(req.file.path)
  await fs.rename(req.file.path,  path.join(PUBLIC_DIR, req.file.originalname))
  res.json({status: "success", code: 201, message: path.join(PUBLIC_DIR, req.file.originalname)})
} else {
   res.status(404).json({status: "error", code: 404, message: "Soething went wrong"})
}
})

app.use('/api', limiter)
app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)



app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
