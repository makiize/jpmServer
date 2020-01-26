var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var adminSchema = new Schema({
  _id: String,
  name: String,
  phone: String
});
module.exports = mongoose.model("admin", adminSchema);
