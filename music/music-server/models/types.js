var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var typeSchema = new Schema({
  name: String, // 音乐类别
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Type", typeSchema, "types");
