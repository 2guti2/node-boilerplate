const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

class Repo {
  constructor () {
    let sequelize = new Sequelize(process.env.DATABASE_URL)
    this.User = require('../../models/user')(sequelize, DataTypes)
  }
}

module.exports = Repo
