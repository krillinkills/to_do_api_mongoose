const router = require('express').Router();
const Todo = require('../models/to_do_schema');

router.get('/', async (req, res) => {
  const key = req.headers.key;
  const response = await Todo.findOne({ uid: key });
  const todo = response.posts;
  const data = todo.filter((obj) => obj.deleted === false);
  let arr = [];
  data.forEach((obj) => {
    arr.push({ todo: obj.todo, todoid: obj.todoid });
  });
  res.send(arr);
});

module.exports = router;
