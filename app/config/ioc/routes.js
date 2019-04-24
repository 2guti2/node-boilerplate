const { loadControllers } = require('awilix-express')

module.exports = {
  configureRoutes: (server) =>
    server.use(loadControllers(`${__dirname}/../../**/*.api.js`, { cwd: __dirname }))
}
