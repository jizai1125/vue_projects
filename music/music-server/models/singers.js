var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var singerSchema = new Schema({
  name: String,
  pic: {
    type: String,
    default: "/uploads/image/default.jpg",
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Singer", singerSchema, "singers");
