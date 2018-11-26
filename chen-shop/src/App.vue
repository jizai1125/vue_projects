<template>
    <div class="app-container">
        <!--头部-->
        <mt-header class="navbar" fixed title="吉仔啦">
            <a @click="goBack" slot="left">
                <mt-button icon="back" v-show="flag">返回</mt-button>
            </a>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
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
                <span class="mui-icon iconfont icon-wode"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-chen" to="/shopcar">
                <span id="badge" v-show="$store.getters.getCount!==0" class="mui-badge mui-badge-danger">{{$store.getters.getCount}}</span>
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
        export default {
            data(){
                return {
                    flag: false, //是否显示放回键
                }
            },
            created(){
                this.flag=this.$route.path!=='/home';
            },
            watch: {
                '$route': function(newVal){
                    if(newVal.path==='/home'){
                        this.flag=false;
                    }else {
                        this.flag=true;
                    }
                }
            },
            methods: {
                goBack(){
                    this.$router.go(-1);
                }
            }
    }
</script>

<style lang="less" scoped>
    .app-container {
        padding-top: 44px;
        padding-bottom: 50px;
        overflow-x: hidden; //隐藏滚动条
        .navbar {
            height: 44px;
        }
        .mui-bar-tab {
            z-index: 999;
            .mui-tab-item-chen {
                position: relative;
                .mui-badge {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    z-index: 1000;
                }
            }
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