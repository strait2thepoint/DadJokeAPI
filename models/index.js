const User = require('./User');
const Joke = require('./Joke');

User.hasMany(Joke, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'

});

Joke.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = { User, Joke };

