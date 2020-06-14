const router = require("koa-router")();
const singer = require("../controllers/singer");

router.prefix("/singer");

// 获取歌手
router.get("/list", singer.getSinger);

// 添加歌手
router.post("/new", singer.newSinger);

// 删除歌手
router.delete("/delete", singer.delSinger);

module.exports = router;
