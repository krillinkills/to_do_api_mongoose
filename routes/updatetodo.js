const Todo = require('../models/to_do_schema');

const router = require('express').Router();

router.put('/', async (req, res) => {
  const key = req.headers.key;
  const todoid = req.body.todoid;
  const todo = req.body.todo;

  const response = await Todo.findOneAndUpdate(
    { uid: key },
    { $set: { 'posts.$[el].todo': todo, 'posts.$[el].updatedAt': Date.now() } }, //$[el]use for selecting and updating
    { arrayFilters: [{ 'el.todoId': todoid }] }
  );
  res.send(response);
});

module.exports = router;
