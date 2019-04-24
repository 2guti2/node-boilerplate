const UserNotFoundError = require('./errors/userNotFound.error')

class UsersService {
  constructor ({ usersDomainService, usersRepositoryService, sessionsService }) {
    this.usersDomainService = usersDomainService
    this.usersRepositoryService = usersRepositoryService
    this.sessionsService = sessionsService
  }

  async getUser (id) {
    let user = await this.usersRepositoryService.getUserWhere({ id: id })
    if (!user) {
      throw new UserNotFoundError()
    }
    return {
      id: user.id,
      username: user.username
    }
  }

  async signup (user) {
    this.usersDomainService.runUserValidations(user)
    const dbUser = await this.usersRepositoryService.newUser(user.username, user.password)
    this.usersDomainService.setHashAndSalt(dbUser, user.password)

    await dbUser.save()

    return {
      id: dbUser.id,
      username: dbUser.username
    }
  }
}

module.exports = UsersService
