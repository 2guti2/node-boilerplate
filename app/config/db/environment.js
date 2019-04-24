class Environment {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  }

  tokenExpiresonInSeconds () {
    return +process.env.TOKEN_EXPIRESON || 360
  }
}

module.exports = Environment
