const { describe, it } = require('mocha')
const { expect } = require('chai')
const UsersService = require('../users.service')
const UsersApplicationFactory = require('./users.application.factory')

describe('UserService', function () {
  describe('signup()', function () {
    it('should validate and save user correctly', async function () {
      const factory = new UsersApplicationFactory()
      const user = factory.user()

      const service = new UsersService({
        usersDomainService: factory.domainService(),
        usersRepositoryService: factory.repositoryService(),
        sessionsService: factory.sessionsService()
      })

      const result = await service.signup(user)
      expect(result).to.be.deep.equal({
        id: user.id,
        username: user.username
      })
    })
  })
})
