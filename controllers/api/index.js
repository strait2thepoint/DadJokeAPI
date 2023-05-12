const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('././models/User', userRoutes);

module.exports = router;