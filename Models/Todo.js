const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: String,
  date: Number,
});

module.exports = TodoSchema;
