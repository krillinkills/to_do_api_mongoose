const router = require('express').Router();
const Todo = require('../models/to_do_schema');

router.post('/', async (req, res) => {
  const key = req.headers.key;
  const todoid = req.body.todoid;
  const response = await Todo.findOneAndUpdate(
    { uid: key },
    { $set: { 'posts.$[el].deleted': false } },
    { arrayFilters: [{ 'el.todoId': todoid }] }
  );
  res.send({ msg: 'post has been recovered' });
});

module.exports = router;
