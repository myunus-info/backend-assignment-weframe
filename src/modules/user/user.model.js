const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide your username'],
    validate: {
      validator: validator.isEmail,
      message: 'The username must be a valid email address!',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    validate: {
      validator: validator.isStrongPassword,
      message:
        'Password must be at least 8 characters long, combined with lowercase and uppercase letters, numbers and symbols',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  return await bcrypt.compare(canditatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
