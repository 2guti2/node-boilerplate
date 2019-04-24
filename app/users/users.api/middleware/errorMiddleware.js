const UserValidationError = require('../../users.domain/errors/userValidation.error')
const UserNotFoundError = require('../../users.application/errors/userNotFound.error')
const DuplicatedUserError = require('../../users.application/errors/duplicatedUser.error')

module.exports = async function errorMiddleware (error, req, res, next) {
  if (error instanceof UserValidationError) {
    res.status(400).send(error.errors)
  } else if (error instanceof DuplicatedUserError) {
    res.status(400).send({ message: error.message })
  } else if (error instanceof UserNotFoundError) {
    res.status(404).send()
  }
  next()
}
