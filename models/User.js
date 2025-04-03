const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;