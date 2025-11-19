const mongoose = require('mongoose');
const FQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});
module.exports = mongoose.model('FQ', FQSchema);