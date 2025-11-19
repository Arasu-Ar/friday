const mongoose = require("mongoose");
const WorkSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:{
      url: {
      type: String,
      required: true,
    },
    publicId: {
       type: String,
       required: true
    }
    }
  });
  module.exports = mongoose.model('work', WorkSchema);
  