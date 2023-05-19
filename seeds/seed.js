const sequelize = require('../config/connection');
const { User, Joke } = require('../models');

const userData = require('./userData.json');
const jokeData = require('./jokeData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const joke of jokeData) {
        await Joke.create({
            ...joke,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();