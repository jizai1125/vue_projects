# Vue-shop项目

>## Day01

## 构建项目
### 主要文件
        
1. main.js 入口文件

2. router.js 路由分发、配置文件

### App主要的组件

1. App公共部分
    - 顶部header部分
        >使用 Mint-UI 中的Header组件
    - 底部tabbar部分
        >使用 Mint-UI 的Tabbar组件,字体图标使用iconfont

2. 路由组件

首页|会员|购物车|搜索
:---:|:---:|:---:|:---:
HomeContainer | MemberContainer | ShopcarContainer | SearchContainer           
NewsList|
---

>## Day02

>按需导入 `import { Header, Tabbar, TabItem, Swipe, SwipeItem } from 'mint-ui';`

###公共部分
1. header部分
   >在main.js中按需导入Mint-UI中的Header组件
2. tabbar部分
   >在main.js中按需导入Mint-UI中的Tabbar、TabItem组件
 
### 首页: HomeContainer组件

1. 轮播图区域 
    * 使用 Mint-UI 的swipe轮播组件
        >在main.js中按需导入Swipe、SwipeItem组件，并注册组件

2. navbar 导航栏区域
    - 使用 MUI 的grid栅格组件
        >在main.js中导入mui.css

3. 九宫格导航栏
    - 新闻资讯（NewsList组件）
    - 图片分享（）
    - 商品购买
    - 留言反馈
    - 视频专区
    - 联系我们
---

>## Day3   

> #### 新闻资讯 
1. 加入NewsList组件，路由链接
2. 制作新闻资讯页面
3. 使用vue-resource获取新闻数据
    - 网易新闻接口：http://3g.163.com/touch/jsonp/sy/recommend/0-9.html
    - 时间格式化，定义全局过滤器，导入moment.js插件
4. 使用mui样式渲染页面