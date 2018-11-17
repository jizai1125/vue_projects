<template>
    <div>
        <!--顶部轮播图-->
        <mt-swipe :auto="4000" ref="swipe" @change="">
            <mt-swipe-item><img src="../../images/l1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l3.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l4.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
        <!--<button @click="prev">pre</button>-->
        <!--<button @click="next">next</button>-->
        <!--/顶部轮播图-->
        <!--导航栏navbar-->
        <div class="navbar">
            <div class="mui-row">
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu1.png" alt="新闻资讯">
                        <p>新闻资讯</p>
                    </router-link>
                </div>
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu2.png" alt="图片分享">
                        <p>图片分享</p>
                    </router-link>
                </div>
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu3.png" alt="商品购买">
                        <p>商品购买</p>
                    </router-link>
                </div>
            </div>
            <div class="mui-row">
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu4.png" alt="留言反馈">
                        <p>留言反馈</p>
                    </router-link>
                </div>
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu5.png" alt="视频专区">
                        <p>视频专区</p>
                    </router-link>
                </div>
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/newsList">
                        <img src="../../images/menu6.png" alt="联系我们">
                        <p>联系我们</p>
                    </router-link>
                </div>
            </div>
        </div>
        <!--/导航栏navbar-->
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // imgLists: [],   //轮播图图片
            }
        },
        created(){
            // this.getSwipeImg();
        },
        methods: {
            //获取图片数据,jsonp
            getSwipeImg(){
                this.$http.jsonp('http://api.douban.com/v2/movie/top250',{params: {start: 5,count: 4}}).then(res=>{
                    console.log(res)
                    if(!res.ok)return;
                    var data=res.body.subjects;
                    for(var item of data){
                        this.imgLists.push({url: item.images.small})
                    }
                })
            },
            //控制轮播图切换下一张
            next(){
                this.$refs.swipe.next()
            },
            //控制轮播图切换上一张
            prev(){
                console.log(this.$refs.swipe)
                this.$refs.swipe.prev();
            },
        }
    }
</script>

<style lang="less" scoped>
    /*轮播图*/
    .mint-swipe {
        height: 200px;
        @media screen and (min-width: 800px) {
            & {
                height: 350px;
            }
        }
        .mint-swipe-item {
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    /*navbar*/
    .navbar {
        .navbar-item {
            text-align: center;
            padding: 10px 0 0;
            a {
                display: inline-block;
                img {
                    display: inline-block;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                }
            }
        }
    }
</style>