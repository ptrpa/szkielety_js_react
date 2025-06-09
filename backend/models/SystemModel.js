const mongoose = require('mongoose')

const systemModelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  variables: {
    type: [String],
    required: true
  },
  equations: {
    type: Object,
    required: true
  },
  parameters: {
    type: Object,
    default: {}
  },
  initialConditions: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: true
  },
  modifiedByAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('SystemModel', systemModelSchema)
