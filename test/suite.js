var glob = require('glob')
var path = require('path')

glob.sync('./app/**/*.test.js').forEach(function (file) {
  require(path.resolve(file))
})
