const mongoose = require('mongoose');
const todoschema = mongoose.Schema({
  emailId: String,
  email: String,
  posts: [
    {
      todo: String,
      deleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now() },
      deletedAt: Date,
      updatedAt: Date,
    },
  ],
});

module.exports = mongoose.model('todo', todoschema);
