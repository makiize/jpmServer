var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var announceSchema = new Schema({
    _id: String,
    topic: String,
    detail: String,
    file: String,
    img : String,
    date: Date
});
module.exports = mongoose.model("announce", announceSchema);