const DuplicatedUserError = require('../users.application/errors/duplicatedUser.error')

class UsersRepositoryService {
  constructor ({ repo }) {
    this.repo = repo
  }

  async getUserWhere (expression) {
    return this.repo.User.findOne({ where: expression })
  }

  async newUser (username, password) {
    const existingUser = await this.getUserWhere({ username: username })
    if (existingUser) {
      throw new DuplicatedUserError('User already exists')
    }

    const User = this.repo.User
    return new User({ username: username, password: password })
  }
}

module.exports = UsersRepositoryService
