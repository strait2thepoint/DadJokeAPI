const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'email', 'password'],
    // include: [{
    //   model: User,
    //   attributes: ['name']
    // }]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
    
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to destroy session' });
        return;
      }
      res.status(204).end();
    });
  } else {
    res.status(404).json({ error: 'No active session found' });
  }
});

// Assuming you have Express and other necessary dependencies imported

router.post('/api/users', async (req, res) => {
  try {
    // Retrieve the user data from the request body
    const { name, email, password } = req.body;

    // Perform any necessary validation or checks on the input data

    // Create a new user in the database using the received data
    const newUser = await User.create({ name, email, password });

    // Optionally, you can generate a JWT token or set a session to authenticate the user

    // Respond with a success status code and any additional data you want to send
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors that occurred during the signup process
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assuming you have Express and other necessary dependencies imported

router.post('/api/users/login', async (req, res) => {
  try {
    // Retrieve the user data from the request body
    const { email, password } = req.body;

    // Perform any necessary validation or checks on the input data

    // Authenticate the user (e.g., by comparing the provided credentials with the stored user data in the database)
    const user = await User.findOne({ email });

    if (!user || !user.verifyPassword(password)) {
      // If authentication fails, respond with an error message
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Optionally, you can generate a JWT token or set a session to authenticate the user

    // Respond with a success status code and any additional data you want to send
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // Handle any errors that occurred during the login process
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
