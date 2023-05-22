const router = require('express').Router();
const { Joke, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const jokeData = await Joke.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const jokes = jokeData.map((joke) => joke.get({ plain: true }));

    res.render('homepage', {
      jokes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/jokes/:id', async (req, res) => {
  try {
    const jokeData = await Joke.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'id'],
        },
      ],
    });

    const joke = jokeData.get({ plain: true });
    res.render('joke', {
      ...joke,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allJokes', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Joke }],
    });

    const user = userData.get({ plain: true });

    res.render('allJokes', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/jokes', (req, res) => {
//   Joke.findAll({

//     include: [{ model: Joke }],
//     include: [
//       {
//         model: User,
//         attributes: ['email'],
//       },
//     ],
//   })
//     .then(rawJokes => {
//       const jokes = rawJokes.map((joke) => joke.get({ plain: true }))
//       res.render('joke', {
//         jokes,
//         logged_in: req.session.logged_in
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// });

router.get('/jokes', (req, res) => {
  Joke.findAll({
    include: [
      {
        model: User,
        attributes: ['email'],
      },
    ],
  })
    .then(rawJokes => {
      const jokes = rawJokes.map((joke) => joke.get({ plain: true }));
      res.render('joke', {
        jokes,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/allJokes');
    return;
  }

  res.render('login');
});

module.exports = router;
