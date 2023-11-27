const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: function (value) {
          return validator.isDate(value);
        },
        message: props => `${props.value} is not a valid date`,
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
