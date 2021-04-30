const Sequelize = require('sequelize');
const env = require('../env')

const config = env.runtime.config

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config)

// model definition
const db = {
  data: require('./data')(sequelize, Sequelize)
}

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db)
  }
})

module.exports = {
  sequelize,
  Sequelize,
  ...db
}