const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const ToDo = require('../models/to_do_schema');

router.post('/', async (req, res) => {
  const todo = req.body.todo;
  const uid = uuidv4();
  const key = req.headers.key;

  const data = {
    todo: todo,
    todoId: uid,
  };
  const response = await ToDo.findOneAndUpdate(
    { uid: key },
    { $push: { posts: data } }
  );
  if (response) return res.send(data);
  return res.status(500).send({ msg: 'not registered' });
});

module.exports = router;
