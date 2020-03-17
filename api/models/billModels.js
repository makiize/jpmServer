var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var billSchema = new Schema({
  _id: String,
  bHouse: String,
  bName: String,
  bill: String,
  date: Date
});
module.exports = mongoose.model("bill", billSchema);