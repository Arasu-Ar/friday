const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({
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
  module.exports = mongoose.model('ourService', ServiceSchema);