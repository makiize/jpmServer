var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var adminSchema = new Schema({
  _id: String,
  addFirstName: String,
  addLastName: String,
  addPhone: String,
  addEmail: String,
  addUsername: String,
  addPassword: String
});
module.exports = mongoose.model("admin", adminSchema);
