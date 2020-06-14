var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recommendSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Recommend", recommendSchema, "recommends");
