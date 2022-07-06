const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/todo';

mongoose.connect(URL, (err, res) => {
  if (err) {
    console.log('Not connected');
  } else {
    console.log('database connected');
  }
});
//Routes
const sendMail = require('./routes/sendmail');

//Route middle
app.use('/register', sendMail);

app.listen(4000, () => console.log('connect'));
