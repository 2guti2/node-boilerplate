'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'password')
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'password', Sequelize.STRING)
  }
}
