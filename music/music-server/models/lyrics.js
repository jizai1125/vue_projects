var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lyricSchema = new Schema({
  content: String, // 歌词内容
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
    required: true,
    // select: false
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Lyric", lyricSchema, "lyrics");
