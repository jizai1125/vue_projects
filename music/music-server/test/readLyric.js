
const fs = require('fs');
const path = require('path');
 
let filePath = resolve('../public/uploads/lyric/1.lrc');
 console.log('filePath', filePath)
let data = fs.readFileSync(filePath);
base64 = new Buffer.from(data, 'utf-8').toString('base64');

 
console.log(base64)
// fs.writeFileSync(path.resolve('your/save/file/path'), base64)
let rawStr = Buffer.from(base64,'base64').toString('utf-8')
console.log('base64解码后的字符串: ',rawStr)


function resolve(dir) {
  console.log(path.join(__dirname, dir));
  return path.join(__dirname, dir);
}