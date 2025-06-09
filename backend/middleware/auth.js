const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: "Brak tokenu autoryzacji" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: "Nieprawidłowy lub przeterminowany token" })
  }
}

module.exports = auth
