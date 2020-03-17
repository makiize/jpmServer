var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  _id: String,
  uName: String,
  phone: String,
  house: String,
  email: String
});

const User = mongoose.model('users', userSchema);
module.exports = User;
