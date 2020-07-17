const mongoose = require('mongoose');
const mongoose = require('../DB/mongo');
const bcrypt = require('bcrypt');
const Todo = require('./Todo');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  answer: String,
  todos: [Todo],
});

UserSchema.pre('save', function (next) {
  if (this.password.length < 20) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      this.password = hashed;
      bcrypt.hash(this.answer, 10, (err, hashed) => {
        this.answer = hashed;
        next();
      });
    });
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
