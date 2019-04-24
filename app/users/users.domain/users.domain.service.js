const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const UserValidationError = require('./errors/userValidation.error')

class UsersDomainService {
  setHashAndSalt (user, password) {
    user.salt = crypto.randomBytes(16).toString('hex')
    user.hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')
  }

  isPasswordValid (user, password) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')
    return user.hash === hash
  }

  generateJWT (user) {
    return jwt.sign({
      username: user.username,
      id: user.id
    }, 'secret')
  }

  toAuthJSON (user) {
    return {
      id: user.id,
      username: user.username,
      token: this.generateJWT(user)
    }
  }

  runUserValidations (user) {
    if (!user.username) {
      throw new UserValidationError({
        username: 'is required'
      })
    }

    if (!user.password) {
      throw new UserValidationError({
        password: 'is required'
      })
    }

    return true
  }
}

module.exports = UsersDomainService
