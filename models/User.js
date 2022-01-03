const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'is missing'],
    trim: true,
    validate: {
      validator: value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
      message: 'email must be valid!'
    }
  },
  password: {
    type: String,
    required: [true, 'is missing'],
    minLength: [5, 'must be 5 minimum 5 charts']
  }

}, {
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;