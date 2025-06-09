const User = require('../models/User')

// GET /admin/users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
}

// PUT /admin/users/:id
exports.updateUser = async (req, res) => {
  const { id } = req.params
  const updated = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  }).select('-password')
  res.json(updated)
}

// DELETE /admin/users/:id
exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await User.findByIdAndDelete(id)
  res.status(204).send()
}

