class SessionsDomainService {
  constructor ({ usersRepositoryService, usersDomainService, cacheService, environment }) {
    this.usersRepositoryService = usersRepositoryService
    this.usersDomainService = usersDomainService
    this.cacheService = cacheService
    this.environment = environment
    this.tokenExpiresonInSeconds = this.environment.tokenExpiresonInSeconds()
  }

  async buildSession (user) {
    return {
      id: user.id,
      username: user.username,
      token: await this.getCurrentUserToken(user)
    }
  }

  async getCurrentUserToken (user) {
    let isTokenInCache = await this.cacheService.isUserTokenInCache(user.username)
    return isTokenInCache
      ? this.cacheService.getExistingUserToken(user.username)
      : this.generateNewUserToken(user)
  }

  generateNewUserToken (user) {
    const responseUser = this.usersDomainService.toAuthJSON(user)
    this.cacheService.saveUserToken(responseUser.username, responseUser.token, this.tokenExpiresonInSeconds)
    return responseUser.token
  }
}

module.exports = SessionsDomainService
