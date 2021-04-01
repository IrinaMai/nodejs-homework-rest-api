const express = require('express')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const app = express()
// const flash = require('connect-flash')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
})

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))
// app.use(flash())

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
