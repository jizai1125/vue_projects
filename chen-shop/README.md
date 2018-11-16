# Vue-shop项目


>## Day01

## 构建项目
### 主要文件
        
1. main.js 入口文件

2. router.js 路由分发、配置文件

### App主要的组件
1. App公共部分
    - 顶部header部分
        >使用的是Mint-UI中的Header组件
    - 底部tabbar部分
        >使用MUI的Tabbar组件,字体图标使用iconfont
            
2. 路由组件
    - 首页：HomeContainer组件
    
    - 会员：MemberContainer组件
    
    - 购物车：ShopcarContainer组件
    
    - 搜索：SearchContainer组件

>## Day02

### 首页: HomeContainer组件

1. 轮播图区域 
    * 使用 Mint-UI 的swipe轮播组件
        >在main.js中按需导入Swipe、SwipeItem组件，并注册组件

2. navbar 导航栏区域
    - 使用 MUI 的grid栅格组件
        >在main.js中导入mui.css
