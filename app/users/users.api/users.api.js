const { createController } = require('awilix-express')
const auth = require('./middleware/auth')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ usersService, wrapAsync }) => ({
  signup: wrapAsync.wrap(async (req, res) => {
    const user = req.body
    res.send(await usersService.signup(user))
  }),
  getUser: wrapAsync.wrap(async (req, res) => {
    res.send(await usersService.getUser(+req.params.id))
  })
})

module.exports = createController(API)
  .post('/users', 'signup')
  .get('/users/:id', 'getUser', {
    before: [auth]
  })
  .after([errorMiddleware])
