const router = require("koa-router")();
const type = require("../controllers/type");

router.prefix("/type");

// 获取类别
router.get("/list", type.getType)

// 添加类别
router.post("/new", type.newType);

// 编辑类别
router.put("/edit", type.editType);

// 删除类别
router.delete("/delete", type.delType)


module.exports = router;
