var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var adminSchema = new Schema({
  _id: String,
  addName: String,
  addPhone: String,
  addEmail: String,
  addUsername: String,
  addPassword: String
});
module.exports = mongoose.model("admin", adminSchema);
