const redis = require('redis')

class Cache {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }

  set (key, value) {
    this.client.set(key, value)
  }

  setWithExpireson (key, value, expiresonInSeconds) {
    this.client.set(key, value, 'EX', expiresonInSeconds)
  }

  keys (pattern, callback) {
    this.client.keys(pattern, callback)
  }

  get (key, callback) {
    this.client.get(key, callback)
  }

  del (key, callback) {
    this.client.del(key, callback)
  }
}

module.exports = Cache
