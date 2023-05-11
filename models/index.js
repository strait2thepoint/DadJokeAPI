const User = require('./User');
const Joke = require('./Joke');

User.hasMany(Joke, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

});

Joke.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Joke };

