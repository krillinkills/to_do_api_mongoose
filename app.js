const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const URL = 'mongodb://localhost/todo';

mongoose.connect(URL, (err, res) => {
  if (err) {
    console.log('Not connected');
  } else {
    console.log('database connected');
  }
});
//Routes
const sendMail = require('./routes/sendmail');
const poste = require('./routes/addPost');
const update = require('./routes/updatetodo');
const deletetodo = require('./routes/deleteTodo');
const gettodo = require('./routes/gettodo');
const generateKey = require('./routes/genereateKey');

//Route middle
app.use('/register', sendMail);
app.use('/', poste);
app.use('/', update);
app.use('/', deletetodo);
app.use('/', gettodo);
app.use('/', generateKey);

app.listen(4000, () => console.log('connect'));
