const router = require("koa-router")();
const collect = require("../controllers/collect");

router.prefix("/collect");

// 获取收藏
router.get("/list", collect.getCollect);

// 添加收藏
router.post("/new", collect.newCollect);

// 删除收藏
router.delete("/delete", collect.delCollect);

module.exports = router;
