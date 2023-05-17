const router = require('express').Router();
const { Joke, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Joke.findAll({
    attributes: ['jokeId', 'jokeSetUp', 'jokePunchLine', 'userId'],
  })
    .then(jokes => {
      res.json(jokes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/:id', (req, res) => {
  Joke.findOne({
    where: {
      jokeId: req.params.id
    },
    attributes: ['jokeId', 'jokeSetUp', 'jokePunchLine', 'userId'],
    include: [{
      model: User,
      attributes: ['name']
    }]
  })
    .then(dbJokeData => {
      if (!dbJokeData) {
        res.status(404).json({ message: 'No Joke found' });
        return;
      }
      res.json(dbJokeData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/', async (req, res) => {
  try {
    const newJoke = await Joke.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newJoke);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const jokeData = await Joke.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!jokeData) {
      res.status(404).json({ message: 'No Joke found with this id!' });
      return;
    }

    res.status(200).json(jokeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;