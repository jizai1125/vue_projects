const router = require("koa-router")();
const recommend = require("../controllers/recommend");

router.prefix("/recommend");

// 获取推荐
router.get("/list", recommend.getRecommend);

// 添加推荐
router.post("/new", recommend.newRecommend);

// 删除推荐
router.delete("/delete", recommend.delRecommend);

module.exports = router;
