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
1. 加入新闻列表NewsList组件，配置路由

>#### 制作新闻资讯页面

1. 新闻列表
    - 使用vue-resource获取新闻数据
    - 网易新闻接口：http://3g.163.com/touch/jsonp/sy/recommend/0-9.html
    - 完成新闻列表资讯，时间格式化，定义全局过滤器，导入moment.js插件
    - 使用mui样式渲染页面
    
2. 新闻列表项跳转新闻详情的路由
    - 创建新闻详情NewsInfo.vue组件
    - 配置路由，path: /home/newsinfo/:id，
    - 根据 **id** 使用ajax获取新闻内容的数据，
    - 因为没有接口，所以使用 **iframe** 元素来装跳转的页面
    
3. 创建评论子组件 comment.vue
    - 在需要评论的组件中**import** 评论子组件
    - 在父组件中通过 components 选项注册评论子组件
    - 以标签形式在页面中引用 < comment >
    
4. 加载新闻详情的评论
    - 接口： **https://www.apiopen.top/satinCommentApi**，参数：**id**:27610708（新闻对应的id）,**page**: 1（页码）
    - 根据新闻详情对应的id获取评论内容数据，通过get请求获取
    - 使用评论组件渲染评论数据