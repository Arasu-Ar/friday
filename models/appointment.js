const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    name: {
    type : String,
    required : true,
    trim : true
  },
    email:{
    type : String,
    required : true,
    trim : true
  },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },
    location:{
    type : String,
    required : true,
    trim : true
  },
    time:{
    type : String,
    required : true,
    trim : true
  },
    date: {type: Date, default: Date.now},
    message: {
    type : String,
    required : true,
    trim : true
  },
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'Rescheduled'],
    status: { type: String, default: 'pending' },
  });
  module.exports = mongoose.model('appointment', AppointmentSchema);
  