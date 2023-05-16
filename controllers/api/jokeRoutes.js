const router = require('express').Router();
const { Joke, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  try {
    const jokeData = Joke.findAll();
    res.status(200).json(jokeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, (req, res) => {
  try {
    const jokeData = Joke.findByPk(req.params.id, {
      include: [{ model: User }]

    });
    res.status(200).json(jokeData);

  }
  catch (err) {
    res.status(500).json(err);

  }
  // find one category by its `id` value
  // be sure to include its associated Jokes
});

router.post('/', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
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