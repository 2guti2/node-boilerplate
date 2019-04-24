module.exports = function errorMiddleware (error, req, res, next) {
  if (error) {
    res.status(500).send({ message: error.message })
  }
  next()
}
