const router = require("koa-router")();
const multer = require("koa-multer");

function newStorage(path) {
  var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, path);
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = file.originalname.split(".");
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    },
  });
  return storage;
}

//加载配置
var uploadImage = multer({
  storage: newStorage("public/uploads/image"),
});

var uploadLyric = multer({
  storage: newStorage("public/uploads/lyric"),
});

var uploadMusic = multer({
  storage: newStorage("public/uploads/music"),
});

// 上传图片
router.post("/upload/img", uploadImage.single("file"), async (ctx) => {
  const { filename } = ctx.req.file;
  ctx.body = {
    code: 200,
    file: {
      path: `/uploads/image/${filename}`,
    },
  };
});

// 上传歌词
router.post("/upload/lrc", uploadLyric.single("file"), async (ctx) => {
  ctx.body = {
    code: 200,
    filepath: ctx.req.file.path
  };
});

// 上传音乐
router.post("/upload/music", uploadMusic.single("file"), async (ctx) => {
  const { filename } = ctx.req.file;
  ctx.body = {
    code: 200,
    file: {
      path: `/uploads/music/${filename}`,
    },
  };
});

module.exports = router;
