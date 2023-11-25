const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide your username'],
  },
  description: {
    type: String,
    required: [true, 'Please provide your description'],
  },
  assignedUser: {
    type: String,
    required: [true, 'Please provide your assigned user'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide your due date'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
