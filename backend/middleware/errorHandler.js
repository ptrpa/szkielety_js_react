function errorHandler(err, req, res, next) {
  console.error("Problem", err)
  res.status(500).json({ error: err.message || "Internal Server Error" })
}

module.exports = errorHandler
