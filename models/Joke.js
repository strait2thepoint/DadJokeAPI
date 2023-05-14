const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //fix these links??
//const User = require('./User');

class Joke extends Model { }

Joke.init(
  {
    jokeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    jokeSetUp: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    jokePunchLine: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'joke',
  }
),

  //Joke.belongsTo(User, { foreignKey: 'userId' });

  module.exports = Joke;