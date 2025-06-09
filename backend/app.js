const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)

app.use(errorHandler)

const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes)


module.exports = app
