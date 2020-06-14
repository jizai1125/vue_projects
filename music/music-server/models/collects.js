var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var collectSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Collect", collectSchema, "collects");