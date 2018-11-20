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
        <nav class="mui-bar mui-bar-tab" ref="muibar">
            <router-link class="mui-tab-item-chen" to="/home">
                <span class="mui-icon iconfont icon-shouye1"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-chen" to="/member">
                <span class="mui-icon iconfont icon-wode"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-chen" to="/shopcar">
                <span class="mui-icon iconfont icon-gouwuche"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-chen" to="/search">
                <span class="mui-icon  iconfont icon-sousuo"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    // import  mui from './lib/mui/js/mui.js';
    // mui('body').on('tap','a',function(){document.location.href=this.href;});

    export default {
        data(){
            return {
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .app-container {
        padding-top: 44px;
        padding-bottom: 50px;
        overflow-x: hidden; //隐藏滚动条
        .mui-title,
        .mui-action-back {
            color: #fff;
        }
        .mui-bar-nav {
            background: #007aff;
        }
        .mui-bar-tab {
            z-index: 999;
        }
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
    /*自定义样式，解决tabbar无法切换问题*/
    .mui-bar-tab {
        .mui-tab-item-chen {
            display: table-cell;
            overflow: hidden;
            width: 1%;
            height: 50px;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #929292;
            .mui-icon {
                top: 3px;
                width: 24px;
                height: 24px;
                padding-top: 0;
                padding-bottom: 0;
            }
            .mui-icon ~ .mui-tab-label {
                font-size: 11px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            &.mui-active {
                color: #007aff;
            }
        }
    }
</style>