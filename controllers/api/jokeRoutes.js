const router = require('express').Router();
const { Joke, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Joke.findAll({
    attributes: ['jokeId', 'jokeSetUp', 'jokePunchLine', 'userId'],
  })
    .then(jokes => {
      res.render('joke', { jokes });
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
      res.render('joke', dbJokeData);
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
      userId: req.session.user_id,
    });

    res.status(200).json(newJoke);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Joke.destroy({
    where: {
      jokeId: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows === 0) {
        res.status(404).json({ message: 'No Joke found with this id' });
        return;
      }
      res.json({ message: 'Joke deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// upvotes a joke (test route is http://localhost:3001/api/jokes/upvote/X , where 'X' is 'jokeId')
router.put('/upvote/:id', async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);

    if (!joke) {
      res.status(404).json({ message: 'No Joke found' });
      return;
    }

    joke.jokeRating += 1;
    await joke.save();

    res.status(200).json(joke);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// downvotes a joke (test route is http://localhost:3001/api/jokes/downvote/X , where 'X' is 'jokeId')
router.put('/downvote/:id', async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);

    if (!joke) {
      res.status(404).json({ message: 'No Joke found' });
      return;
    }

    joke.jokeRating -= 1;
    await joke.save();

    res.status(200).json(joke);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
