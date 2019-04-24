const UnauthorizedAccessError = require('../../sessions/sessions.application/errors/unauthorizedAccess.error')

class SessionsService {
  constructor ({ sessionsDomainService, usersDomainService, usersRepositoryService }) {
    this.sessionsDomainService = sessionsDomainService
    this.usersDomainService = usersDomainService
    this.usersRepositoryService = usersRepositoryService
  }

  async login (user) {
    this.usersDomainService.runUserValidations(user)
    const acceptedUser = await this.getUserIfPasswordValid(user)

    if (!acceptedUser) {
      throw new UnauthorizedAccessError('Wrong user credentials')
    }

    return this.sessionsDomainService.buildSession(acceptedUser)
  }

  async getUserIfPasswordValid (user) {
    let foundUser = await this.usersRepositoryService.getUserWhere({ username: user.username })
    const isPasswordValid = foundUser && this.usersDomainService.isPasswordValid(foundUser.dataValues, user.password)
    return !isPasswordValid ? isPasswordValid : foundUser.dataValues
  }
}

module.exports = SessionsService
