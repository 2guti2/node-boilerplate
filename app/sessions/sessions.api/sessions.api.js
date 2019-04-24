const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ sessionsService, wrapAsync }) => ({
  login: wrapAsync.wrap(async (req, res) => {
    const user = req.body
    res.send(await sessionsService.login(user))
  })
})

module.exports = createController(API)
  .post('/sessions', 'login')
  .after([errorMiddleware])
