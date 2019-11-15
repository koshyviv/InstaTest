const mongoose = require('mongoose');

let driverSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  car:String,
  lang:[],
});

module.exports = mongoose.model('Drivers', driverSchema);