var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var serviceSchema = new Schema({
  _id: String,
  serTopic: String,
  serDetail: String,
  serFile: String,
  serDate: Date
});
module.exports = mongoose.model("service", serviceSchema);
