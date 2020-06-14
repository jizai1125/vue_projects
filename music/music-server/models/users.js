var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  password: String,
  avatar: {
    type: String,
    default: "/uploads/image/default.jpg",
  },
  role: { // 角色 user、admin
    type: String,
    default: "user",
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('User', userSchema, 'users')
