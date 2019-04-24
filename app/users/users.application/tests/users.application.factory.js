class UsersApplicationFactory {
  user () {
    return {
      id: 1,
      username: 'juango',
      password: '123456',
      save: () => {}
    }
  }

  domainService () {
    return {
      runUserValidations: () => true,
      setHashAndSalt: () => {},
      toAuthJSON: (user) => user
    }
  }

  repositoryService () {
    return {
      newUser: () => {
        return this.user()
      }
    }
  }

  sessionsService () {
    return {}
  }
}

module.exports = UsersApplicationFactory
