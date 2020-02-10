var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  phone: String,
  house: String,
  Email: String,
  username: String,
  password: String
});
module.exports = mongoose.model("users", userSchema);
