const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/skydrive';
mongoose.connect(DB_URL, {
    useNewUrlParser: true
}, (err, res) => {
    if (!err) {
        // console.log(res);
    }
});
let db = mongoose.connection;
db.on("error", () => {
  console.log("链接失败");
});
db.once("open", () => {
  console.log("链接成功");
});
db.once("close", () => {
  console.log("数据库断开成功");
});

const Schema = mongoose.Schema;

//用户集合
const userSchema = new Schema({
    name: String,
    pwd: String,
    createTime: String
});

const user = mongoose.model('user', userSchema);
//列表集合
const listSchema = new Schema({
    name: String,
    type: String, // file（文件）、folder（文件夹）
    size: String,
    updateTime: String,
    parId: String,
    pathRoot: Array,
    creator: String,
    sourceType: String  // 资源类型
});
const cloudlist = mongoose.model('cloudlist', listSchema);
module.exports = {
    user,
    cloudlist
};