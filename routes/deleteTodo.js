const Todo = require('../models/to_do_schema');
const router = require('express').Router();

router.delete('/', async (req, res) => {
  const key = req.headers.key;
  const todoid = req.body.todoid;

  const response = await Todo.findOneAndUpdate(
    { uid: key },
    {
      $set: {
        'posts.$[el].deleted': true,
        'posts.$[el].deletedAt': Date.now(),
      },
    }, //$[el]use for updating
    { arrayFilters: [{ 'el.todoId': todoid }] }
  );
  res.send({ msg: 'deleted' });
});

module.exports = router;
