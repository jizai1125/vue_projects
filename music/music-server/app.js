const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
var cors = require("koa2-cors");
const logger = require('koa-logger');
const jwtKoa = require('koa-jwt');
const { secret } = require('./config/token');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const users = require('./routes/users');
const upload = require('./routes/upload');
const type = require("./routes/type");
const singer = require("./routes/singer");
const song = require("./routes/song");
const collect = require("./routes/collect");
const recommend = require("./routes/recommend");
const lyric = require('./routes/lyric')
const searchHis = require('./routes/searchHis')

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(cors());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '未登录认证',
      };
    } else {
      throw err;
    }
  });
});
/* 路由权限控制 */
app.use(
  jwtKoa({ secret: secret }).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
      "/users/login",
      "/users/register",
      /^(\/upload\/).*$/,
      // /^\/api\/login/,
      // /^\/api\/register/,
      /^(\/uploads\/).*$/, // 设置除了私有接口外的其它资源，可以不需要认证访问
    ],
  })
);

// 连接MongoDB数据库
mongoose.connect("mongodb://127.0.0.1:27017/music", {
  useMongoClient: true,
});  // 不加密

mongoose.connection.on('connected', function () {
  console.log('mongoDB 连接成功')
})

mongoose.connection.on('error', function () {
  console.log('mongoDB 连接失败')
})

mongoose.connection.on('disconnected', function () {
  console.log('mongoDB 断开')
})


// routes
app.use(users.routes(), users.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());
app.use(type.routes(), type.allowedMethods());
app.use(singer.routes(), singer.allowedMethods());
app.use(song.routes(), song.allowedMethods());
app.use(collect.routes(), collect.allowedMethods());
app.use(recommend.routes(), recommend.allowedMethods());
app.use(lyric.routes(), lyric.allowedMethods());
app.use(searchHis.routes(), searchHis.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
