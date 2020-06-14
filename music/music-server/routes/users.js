const router = require("koa-router")();
const user = require("../controllers/user");

router.prefix("/users");

router.post("/register", user.register);

router.post("/login", user.login);

router.get("/list", user.getUser);

router.delete('/delete', user.delUser)

router.put('/edit', user.editUser)

router.get('/info', user.getUserInfo);

router.post('/editPwd', user.editUserPwd)

// // 修改个人信息
// router.post('/edit', user.editUser);

// // 修改密码
// router.post('/editPwd', user.editUserPwd);

module.exports = router;
