const { asClass, createContainer, Lifetime } = require('awilix')
const { scopePerRequest } = require('awilix-express')
const repo = require('../db/repo')
const cache = require('../cache/cache')
const environment = require('../db/environment')
const wrapAsync = require('../middleware/wrapAsync')

const container = createContainer()

container.register({
  repo: asClass(repo).scoped(),
  cache: asClass(cache).scoped(),
  environment: asClass(environment).scoped(),
  wrapAsync: asClass(wrapAsync).scoped()
})

container.loadModules(
  [
    [`${__dirname}/../../**/*.service.js`, { register: asClass }]
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  }
)

container.registerServices = (app) => {
  app.use(scopePerRequest(container))
}

module.exports = container
