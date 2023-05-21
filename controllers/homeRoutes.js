const router = require('express').Router();
const { Joke, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jokeData = await Joke.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const jokes = jokeData.map((joke) => joke.get({ plain: true }));

    // Pass serialized data and session flag into template
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

// Use withAuth middleware to prevent access to route
router.get('/joke', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('joke', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/joke');
    return;
  }

  res.render('login');
});

module.exports = router;
