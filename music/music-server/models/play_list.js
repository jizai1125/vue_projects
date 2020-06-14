var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var playListSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("PlayList", playListSchema, "play_list");