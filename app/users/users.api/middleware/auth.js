const jwt = require('jsonwebtoken')
const container = require('../../../config/ioc/container')
const cacheService = container.resolve('cacheService')

module.exports = async function auth (req, res, next) {
  const token = req.headers.auth
  const isTokenInCache = await cacheService.isPlainUserTokenInCache(token)
  if (!isTokenInCache) {
    try {
      jwt.verify(token, 'secret')
      res.status(403).send({ message: 'Token expired' })
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  }
  next()
}
