const fs = require("fs");
const path = require("path");

function readFiletoBase64(filepath) {
  let data = fs.readFileSync(filepath);
  // const base64 = new Buffer.from(data, "utf-8").toString("base64");
  return data;
}

function resolve(dir) {
  console.log(path.join(__dirname, dir));
  return path.join(__dirname, dir);
}

module.exports = {
  readFiletoBase64,
};
