'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'hash', Sequelize.TEXT)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'hash', Sequelize.STRING(1000))
  }
}
