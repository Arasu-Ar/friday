const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  name:{
    type : String,
    required : true,
    trim : true
  },
  ratings:{
    type : String,
    required : true,
    trim : true
  },
   location:{
    type : String,
    required : true,
    trim : true
  },
  message: {
    type : String,
    required : true,
    trim : true
  },
  approved: { type: Boolean, default: false }},
  { timestamps: true
});
module.exports = mongoose.model('feedback', FeedbackSchema);