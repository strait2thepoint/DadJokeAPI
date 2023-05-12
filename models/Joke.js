const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //fix these links??

class Joke extends Model {}

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
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: User,
            key: 'id'
        },
      },
    },
),
Joke.belongsTo(User, { foreignKey: 'userId' });

module.exports = Joke;