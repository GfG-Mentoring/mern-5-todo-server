const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: 'User email is required.',
    index: true,
  },
  fullName: {
    type: String,
    required: 'Full name is required',
  },
  password: {
    type: String,
    required: 'Password is required.',
  },
});

const Users = mongoose.model('Users', userSchema);

module.exports = { Users };
