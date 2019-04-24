class CacheService {
  constructor ({ cache }) {
    this.cache = cache
    this.userTokenPrefix = 'user_token'
  }

  saveUserToken (username, token, expiresonInSeconds) {
    const key = `${this.userTokenPrefix}_${username}_${token}`
    this.cache.setWithExpireson(key, token, expiresonInSeconds)
  }

  async isPlainUserTokenInCache (token) {
    const pattern = `${this.userTokenPrefix}_*_${token}`
    const cacheKeys = await this.getCacheKeys(pattern)
    return cacheKeys.length > 0
  }

  async isUserTokenInCache (username) {
    const cacheKeys = await this.getUsernameCacheKeys(username)
    try {
      const value = await this.getCacheValue(cacheKeys[0])
      return value != null
    } catch (err) {
      return false
    }
  }

  async getExistingUserToken (username) {
    const cacheKeys = await this.getUsernameCacheKeys(username)
    return this.getCacheValue(cacheKeys[0])
  }

  async getUsernameCacheKeys (username) {
    const pattern = `${this.userTokenPrefix}_${username}*`
    return this.getCacheKeys(pattern)
  }

  async getCacheValue (key) {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async getCacheKeys (pattern) {
    return new Promise((resolve, reject) => {
      this.cache.keys(pattern, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  }
}

module.exports = CacheService
