'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'hash', Sequelize.STRING),
      queryInterface.addColumn('Users', 'salt', Sequelize.STRING)
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'hash'),
      queryInterface.removeColumn('Users', 'salt')
    ])
  }
}
