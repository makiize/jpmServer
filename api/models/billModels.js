var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var billSchema = new Schema({
  _id: String,
  house: String,
  firstName: String,
  lastName: String,
  bill: String,
  date: Date
});
module.exports = mongoose.model("bill", billSchema);