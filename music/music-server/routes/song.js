const router = require("koa-router")();
const song = require("../controllers/song");

router.prefix("/song");

// 模糊搜索
router.get("/search", song.querySong);

// 获取歌曲
router.get("/list", song.getSong);

// 添加歌曲
router.post("/new", song.newSong);

// 编辑歌曲
router.put("/edit", song.editSong)

// 删除歌曲
router.delete("/delete", song.delSong);

module.exports = router;
