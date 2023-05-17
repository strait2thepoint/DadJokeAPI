const router = require('express').Router();
const { Joke } = require('../../models');
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
  const { jokeId, jokeSetUp, jokePunchLine, userId } = rec.params
  Joke.findOne({
    //  attributes: { exclude: ['password'] },
    where: {
      id
    },
    include: [
      {
        model: Joke,
        attributes: [jokeId, jokeSetUp, jokePunchLine, userId] //this was broken once, But Mark walked us through how to fix it
      },

    ]
  })
    .then(jokeData => {
      if (!jokeData) {
        res.status(404).json({ message: 'No joke found' });
        return;
      }
      res.json(jokeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Jokes
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