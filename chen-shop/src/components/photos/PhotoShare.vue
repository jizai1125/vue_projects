<template>
    <div>
        <div id="slider" class="mui-slider" @slide="handle">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        关注
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        随机
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                </div>
            </div>

        </div>
        <ul class="photoshare mui-table-view">
            <li class="mui-card">
                <header class="mui-card-header mui-card-media">
                    <img src="https://avatars0.githubusercontent.com/u/33979706?s=40&v=4" alt="">
                    <div class="mui-media-body">
                        jizai
                        <p>timetime</p>
                    </div>
                </header>
                <div class="mui-card-content">
                    <img src="https://avatars2.githubusercontent.com/u/33979706?s=460&v=4" alt="">
                </div>
                <footer class="mui-card-footer">
                    <!--flag为true则添加active类，爱心显示为红色-->
                    <span @click="flag=!flag" :class="(flag ? 'active': '')" class="iconfont icon-heart"></span>
                    <a href="javascript;"><span>关注</span></a>
                    <a href="javascript;"><span>评论</span></a>
                </footer>
            </li>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'

    export default {
        name: "PhotoShare",
        data(){
            return{
                flag: false,    //爱心颜色标志位
            }
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.001 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        computed: {
        },
        methods: {
            handle(){
                console.log('fa')
            }
        },
    }
</script>

<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }
     .photoshare{
         a {
             /*color: ;*/
         }
         .mui-card-content {
             img {
                 display: block;
                 width: 100%;
             }
         }
         .mui-card-footer {
             .icon-heart.active {
                 color: red;
             }
         }
     }
</style>