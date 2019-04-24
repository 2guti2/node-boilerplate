const UnauthorizedAccessError = require('../../sessions.application/errors/unauthorizedAccess.error')

module.exports = async function errorMiddleware (error, req, res, next) {
  if (error instanceof UnauthorizedAccessError) {
    res.status(400).send({ message: error.message })
  }
}
