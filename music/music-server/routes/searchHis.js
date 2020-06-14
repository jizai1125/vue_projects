const router = require("koa-router")();
const searchHis = require("../controllers/search_his");

router.prefix("/search_his");

// 获取搜索历史
router.get("/list", searchHis.getSearchHis);

// 添加搜索历史
router.post("/new", searchHis.newSearchHis);

// 删除搜索历史
router.delete("/delete", searchHis.delSearchHis);

// 清空搜索历史
router.delete("/clear", searchHis.clearSearchHis);

module.exports = router;
