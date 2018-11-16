<template>
    <div class="app-container">
        <!--头部-->
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">吉仔</h1>
        </header>
        <!--router-view-->
        <transition mode="">
            <router-view></router-view>
        </transition>
        <!--底部tabbar-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon iconfont icon-shouye1"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon iconfont icon-wode"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon iconfont icon-gouwuche"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon  iconfont icon-sousuo"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "App",
        data(){
            return {
            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .mui-title,
    .mui-action-back {
        color: #fff;
    }
    .mui-bar-nav {
        background: #007aff;
    }
    .app-container {
        padding-top: 40px;
        overflow-x: hidden; //隐藏滚动条
    }
    .v-enter {
        transform: translateX(100%);
    }
    .v-leave-to {
        position: absolute;
        opacity: 0;
        transform: translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all .2s ease-out;
    }
</style>