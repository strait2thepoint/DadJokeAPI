const express = require ('express');
const app = express();
const User = require('../../models/User');

app.get('././models/User', (req, res) => {

    res.send('Get all Users');
  });

app.get('././models/Joke', (req, res) => {

     res.send('Get all Jokes');
  });

//need to change port from 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });