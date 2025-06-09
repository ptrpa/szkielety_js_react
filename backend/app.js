const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')

const adminRoutes = require('./routes/adminRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/models', require('./routes/modelRoutes'))


app.use('/api', authRoutes)

app.use('/api/admin', adminRoutes)

app.use(errorHandler)


module.exports = app
