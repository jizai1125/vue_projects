var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var songsSchema = new Schema(
  {
    title: String, // 歌曲名
    url: String, // 音频链接
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    }, // 音乐类别
    singer: {
      type: Schema.Types.ObjectId,
      ref: "Singer",
      required: true,
    }, // 歌手
    // singers: [
    //   {
    //     singer: { type: Schema.Types.ObjectId, ref: "Singer" },
    //     __v: { type: Number, select: false },
    //   },
    // ], // 歌手
    __v: { type: Number, select: false },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

module.exports = mongoose.model("Song", songsSchema, "songs");
