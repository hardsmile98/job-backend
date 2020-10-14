const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const decode = jwt.verify(token, config.get('jwtSecret'))
    req.id = decode.id
    next()
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
