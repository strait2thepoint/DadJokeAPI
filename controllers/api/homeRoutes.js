//requires files needed to run
const router = require('express').Router();
const homeRoutes = require('../../models')

//Get all Jokes
router.get('/', async (req, res) => {
  try {
    const homeRoutesData = await HomeRoutes.findAll();
    res.status(200).json(homeRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get a single Joke
router.get('/:id', async (req, res) => {
  try {
    const homeRoutesData = await homeRoutes.findByPk(req.params.id, {
      // JOIN with Joke_ID, using the Joke through table
      include: [{ model: Joke, through: JokeDatabase, as: 'Joke_ID' }] //JokeDatabase must be changed to the name of the Database. Joke_ID is the PK of Joke table
    });

    if (!homeRoutesData) {
      res.status(404).json({ message: 'No Joke found with this ID' });
      return;
    }

    res.status(200).json(homeRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create a joke
router.post('/', async (req, res) => {
  try {
    const homeRoutesData = await homeRoutes.create(req.body);
    res.status(200).json(homeRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Delete a Joke
router.delete('/:id', async (req, res) => {
  try {
    const homeRoutesData = await homeRoutes.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!homeRoutesData) {
      res.status(404).json({ message: 'No Jokes found with this id' });
      return;
    }

    res.status(200).json(homeRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;