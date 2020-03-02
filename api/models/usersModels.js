var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  _id: String,
  uName: String,
  phone: String,
  house: String,
  Email: String,
  username: String,
  password: String,
  password2: String
});

const User = mongoose.model('users', userSchema);
module.exports = User;
