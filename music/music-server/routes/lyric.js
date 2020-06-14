const router = require("koa-router")();
const lyric = require("../controllers/lyric");

router.prefix("/lyric");

// 获取歌词
router.get("/list", lyric.getLyric);

// 添加歌词 
router.post("/new", lyric.newLyric);

// 更改歌词
router.put("/edit", lyric.editLyric);

// 删除歌词
router.delete("/delete", lyric.delLyric);

module.exports = router;
