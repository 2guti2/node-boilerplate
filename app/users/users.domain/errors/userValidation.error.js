class UserValidationError extends Error {
  constructor (errors) {
    super()
    this.errors = errors
  }
}

module.exports = UserValidationError
