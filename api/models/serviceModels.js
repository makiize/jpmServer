var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var serviceSchema = new Schema({
  _id: String,
  serTopic: String,
  tool: String,
  serDetail: String,
  status: String,
  serimg: String,
  location: String,
  serDate: Date
});
module.exports = mongoose.model("service", serviceSchema);
