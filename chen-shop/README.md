# Vue-shop项目

>## Day01

![img](https://github.com/Fighter1125/Vue-projects/blob/master/chen-shop/src/images/show.gif)
## 构建项目
搭建脚手架

### App主要的组件

1. 主组件App.vue

2. App公共部分
    - 顶部header部分
    - 底部tabbar部分
3. tabbar部分

    首页|会员|购物车|搜索
    :---:|:---:|:---:|:---:
    HomeContainer.vue | MemberContainer.vue | ShopcarContainer.vue | SearchContainer.vue
    
4. 子组件

    评论组件|轮播组件|数字选择框(商品详情页)|数字选择框(购物车)|播放器组件
    :---:|:---:|:---:|:---:|:---:|
    Comment.vue|Swipe.vue|Numbox_goodsInfo.vue|Numbox_shopCar.vue|VideoControl.vue


5. 其他组件

    新闻资讯块|图片分享块|商品购买|每日视频|
    :---:|:---:|:---:|:---:|
    新闻列表、新闻详情|图片列表、图片详情|商品列表、商品详情、商品介绍、商品评价|视频列表|
    NewsList.vue、NewsInfo.vue|PhotoList.vue、PhotoInfo.vue|GoodsList.vue、GoodsInfo.vue、GoodsDesc.vue、GoodsCmts.vue|VideoList.vue|
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
        
        >因为在其他地方也有用到轮播组件，所以封装为轮播子组件 Swipe.vue
        - 使用时，绑定该组件一个items属性，值为数组，格式如：[{src: '''}，{src: '''}]，src必选
        - 还可绑定isFull属性，值为布尔值，设置图片宽度是否100%,不设置则自适应

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

1. 创建图片分享列表组件PhotoList.vue
    1. 3个分类：美女、动图、逗比
    
2. 配置路由
    1. 导入PhotoList.vue，设置path. path: /home/photoShare
    2. 设置router-link to属性
    
3. 获取图片资源
    1. 接口：**https://www.apiopen.top/satinGodApi?type=${cateId}&page=1**
    2. type对应分类，type=1为美女，3为图片，4为动图，5为短视频
    2. 根据图片分类对应的id请求相应的资源 
    3. 使用MUI卡片视图组件渲染数据
    4. 图片列表使用mint-ui 的懒加载组件lazyload，如果按需引入mint-ui组件的话则没有懒加载图标效果，所以完整引入mint-ui

4. 分类
    > 美图分类
    - 只显示图片
    > 动图、逗比分类
    - 显示头像，用户名，发布时间，图片
    - 功能：点赞、关注、评论

5. 图片列表条状图片详情页
    1. 创建图片详情组件，配置路由：path: /home/photoInfo/:图片对应的id
    2. 根据图片对应的id发送请求，获取图片详情

6. 图片详情页
    1. 内容：标题、发表时间、浏览量、缩略图预览、评论组件
    2. 缩略图预览使用vue-picture-swipe 组件，使用说明：**https://github.com/Fighter1125/vue-picture-swipe.git**

>## Day5
   
> #### 商品购买

1. 配置路由，点击跳转到商品列表页

2. 创建商品列表组件，GoodsList.vue

4. 获取商品列表数据

5. 制作商品列表
    1.  商品列表项样式，使用 **flex** 布局   
    2.  点击加载更多按钮，发送请求获取数据，拼接到现有数据
    3. 点击商品跳转商品详情页
    
6. 制作商品详情页
    1. 创建商品详情组件
    2. 配置路由，path: /home/goodsInfo/:商品对应的id
    3. 根据保存在路由param参数中的 id 请求对应的商品详情数据
    4. 制作商品详情页样式，使用mui卡片样式

7. 商品详情页功能实现
    > 分为三个模块：商品轮播展示、商品操作区域、商品详情介绍
    - 商品轮播展示
        1. 使用 轮播子组件 Swipe.vue
    - 商品操作区域
        1. 购买数量加、减
            - 使用mui numbox组件，将该组件封装为子组件 Numbox_goodsInfo.vue
        2. 加入购物车、立即购买 
            - 点击加入购物车按钮，有小球动画掉到购物车
            - Numbox_goodsInfo.vue 子组件通过监听input框change事件，将购买数量数值传给父组件 GoodsInfo.vue
            - 父组件 GoodsInfo.vue 向子组件 Numbox_goodsInfo.vue 传库存值设置子组件的最大可选数量
            > 注意： 因为父组件传来的库存值max是异步获取的，所以还没获取到之前max是undefined，可通过监听属性来更新
            - ####通过 Vuex 保存状态数据实现添加到购物车的功能
            > 因为商品的数据需要在多个组件之间共享，使用Vuex非常方便实现
             1. 在store state属性中创建一个数组shopCar保存商品信息对象，商品信息对象如{id: 商品id, count: 商品数量， price: 商品单价，selected: 商品是否被选中}
             2. 在store mutations属性设置添加到state中shopCar数组的方法addToShopCar，同时也保存到本地存储localstorage，每次进入页面时，先获取本地存储，然后赋给state里的shopCar数组
             3. 在store getters属性中设置一个方法getCount获取总商品数量
             4. 购物车徽标值 通过$store.getters.getCount方法获取设置
                
            > **组件中使用Vuex**： 
            > 1. 装包：**npm i vuex -S**  
            > 2. main.js导入：**import Vuex from 'vuex';**
            > 3. 安装：**Vue.use(Vuex);**
            > 4. 创建Vuex实例: **var store=new Vuex({ state: {}, mutations:{}, getters:{ } })**
            > 5. 在vue实例中注册：var vm=new Vue({ store })     
            > - 访问state中的数据使用 **this.$store.state.***** 或者 **this.$store.commit('方法名',参数).** 获取,不建议直接访问state中的数据
            > - 访问getters中的方法，**this.$store.getters.*****,getters类似于vue中的过滤器或者计算属性，如果在访问state中的数据时要经过处理，用getters
    - 商品详情介绍
        1. 图文介绍、商品评论
            - 创建商品介绍组件 GoodsDesc.vue，根据id获取商品详情数据
            - 创建商品评论组件 GoodsCmts.vue,引入评论子组件，根据id获取评论数据              
    
>## Day6
   
> #### 购物车页 ShopCarContainer.vue
>因为所有数据保存在store中和localStorage中，所以修改store中数据的同时，也要重新设置localStorage的值

1. 创建商品列表样式(使用MUI卡片视图样式)
    1. 单选框（mint-switch组件）、图片、标题、价格、数字选择框（创建 Numbox_shopCar.vue组件）、删除键    
2. 商品数据获取
    1. 根据存在store里的所有商品id发送请求获取商品相关的数据，再渲染到页面上
    2. 商品的购买数量从store里面获取
3. 设置、监听数字选择框Numbox_shopCar.vue的值
    > 父组件中需要给该组件绑定商品id 和 商品的数量count
    1. 设置初始值；在购物车组件shopcarContainer.vue中，给该组件绑定属性count向该组件传值，然后设置numbox数字选择框的初始值
    2. 监听值的变化；通过给该组件中的input元素绑定chang事件监听数值的变化；当值变化时，修改存在store中对应商品的数量。在store的mutations中添加方法updateGoodsCount
4. 更改选中状态（默认选中）
    1. 通过mint-switch组件的change事件来获取选中状态
    2. 然后根据商品id修改存在store中对应商品的选中状态，在store的mutations中添加方法updateGoodsSelected
5. 计算选中商品的总数量和总价
    1. 在store的getters中添加方法getGoodsCountAndAmount，遍历存在store的shopCar,计算选中状态为true的商品数量和总价
    2. 在购物车组件shopcarContainer.vue中，调用方法getGoodsCountAndAmount获取勾选商品数量和总价

>## Day7

>#### 搜索页 SearchContainer.vue

- 接口：**https://api.apiopen.top/likePoetry**；
- get请求，参数name，参数值为诗词中出现的字都行

1. 点击搜索按钮发送get请求，

2. 请求过程中显示加载样式，使用mint-ui的spinner组件

3. 返回结果使用mui的卡片视图card渲染   
    
>#### 首页每日视频 VideoList.vue 

- 接口：**https://api.apiopen.top/todayVideo**
   
1. 创建VideoList.vue 组件，设置router-link, 配置路由
2. 跳转到该页面时，自动发送get请求获取数据

>#### 创建播放器组件 VideoControls.vue
    
1. 显示信息：进度条，总时长和已播放时长
2. 默认显示播放按钮，点击播放按钮，播放视频->隐藏控件，
3. 点击视频任何位置，显示/隐藏控件
   >按钮区在绑定点击事件时，为了防止点击穿透，可以用事件修饰符 **.stop**

## 问题汇总
1. 真机调试：
   - 手机和电脑处于同一局域网，可以通过连同一WiFi
   - 在项目中的package.json文件 的scripts项 'start'脚本添加 --host指令，然后将当前WiFi IP地址设置为 --host 的指令值
   - 手机输入IP地址

2. 部署到Apache上，启用Apache gzip压缩，在httpd.conf中
   - 开启模块：<br>**LoadModule deflate_module modules/mod_deflate.so**<br> 和 **LoadModule headers_module modules/mod_headers.so**
   - 添加配置:<br> **\<IfModule mod_deflate.c><br>
     \# 告诉 apache 对传输到浏览器的内容进行压缩<br>
     SetOutputFilter DEFLATE<br>
     \# 压缩等级 9<br>
     DeflateCompressionLevel 9<br>
     \</IfModule>**
   - 当成功时，在响应头中存在 Content-Encoding: gzip

3. 使用ngrok将本机映射为一个外网的Web服务器
     注意：由于默认使用的美国的服务器进行中间转接，所以访问速度炒鸡慢，访问时可启用FQ软件，提高网页打开速度！

4. 引入mui.js时会报错，底部tabbar点击无法切换。
Unable to preventDefault inside passive event listener due to target being treated as passive
    
    * 解决方法：
    >方法1：手动路由设置路由跳转：
    **mui('body').on('tap','a',function(){document.location.href=this.href;});**
    
    >方法2：因为类名为mui-tab-item有冲突，删除此类名，自己命名一个类名mui-tab-item-chen,样式和mui-tab-item一样

5. 制作图片分享顶部导航滑动效果，使用mui scroll组件，滑动时会报错，和上一个问题一样的错误；
   <br>还有初始化时，要放在mounted函数钩子里，等待元素被挂载到DOM树再初始化，否则进入该页面时,无法滑动导航栏
    * 解决方法：
     
     >加入样式：**\* {touch-action: pan-y;}**
