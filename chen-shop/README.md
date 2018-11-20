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
3. tabbar组件

    首页|会员|购物车|搜索
    :---:|:---:|:---:|:---:
    HomeContainer.vue | MemberContainer.vue | ShopcarContainer.vue | SearchContainer.vue
    
2. 子组件

    评论组件|haha|haha
    :---:|:---:|:---:
    Comment.vue|fd|fds


4. 其他组件

    新闻类|haha|haha
    :---:|:---:|:---:
    新闻列表、新闻详情|fd|fds
    NewsList.vue、NewsInfo.vue|
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
    1. 使用vue-resource获取新闻数据
    2. 网易新闻接口：http://3g.163.com/touch/jsonp/sy/recommend/0-9.html
    3. 完成新闻列表资讯，时间格式化，定义全局过滤器，导入moment.js插件
    4. 使用mui样式渲染页面
    
2. 新闻列表项跳转新闻详情的路由
    1. 创建新闻详情NewsInfo.vue组件
    2. 配置路由，path: /home/newsinfo/:id，
    3. 根据 **id** 使用ajax获取新闻内容的数据，
    4. 因为没有接口，所以使用 **iframe** 元素来装跳转的页面
           
3. 创建评论子组件 comment.vue
    1. 接口： **https://www.apiopen.top/satinCommentApi**，参数：**id**:27610708（新闻对应的id）,**page**: 1（页码）
    2. 根据新闻详情对应的id获取评论内容数据，通过get请求获取
    3. 默认只显示热评
    4. 点击加载更多按钮，会发送请求获取下一页评论，默认显示第一页评论数据
  
    ######**组件用法：**
    1. 在需要评论的组件中**import** 评论子组件
    2. 在父组件中通过 components 选项注册评论子组件
    3. 以标签形式在页面中引用 < comment >

4. 发表评论
    1. 把文本框做双向绑定
    2. 发表评论按钮绑定事件
    3. 校验评论是否为空，为空，则使用Toast组件提示信息
    4. 通过vue-resource 发送一个请求，把评论内容提交到服务器
    5. 重新请求获取最新评论数据
        >因为获取评论是根据页码来获取的，所以可能获取到的不是最新的，而是当前页；所以可以手动将评论添加到存放评论存放的数组，这样评论就会放到开头。
      
>## Day4   

> #### 图片分享

1. 创建图片分享列表组件PhotoShare.vue

2. 配置路由
    1. 导入PhotoShare.vue，设置path. path: /home/photoShare
    2. 设置router-link to属性
    
3. 使用MUI卡片视图组件渲染数据


## 问题汇总
1. 引入mui.js时会报错，底部tabbar点击无法切换。
Unable to preventDefault inside passive event listener due to target being treated as passive
    
    * 解决方法：
    >方法1：手动路由设置路由跳转：
    **mui('body').on('tap','a',function(){document.location.href=this.href;});**
    
    >方法2：因为类名为mui-tab-item有冲突，删除此类名，自己命名一个类名mui-tab-item-chen,样式和mui-tab-item一样

2. 制作图片分享顶部导航滑动效果，使用mui scroll组件，滑动时会报错，和第一个问题一样的错误；
   <br>还有初始化时，要放在mounted函数钩子里，等待元素被挂载到DOM树再初始化，否则进入该页面时,无法滑动导航栏
    * 解决方法：
     
     >加入样式：**\* {touch-action: pan-y;}**
