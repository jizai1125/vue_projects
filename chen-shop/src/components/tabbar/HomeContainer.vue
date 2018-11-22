<template>
    <div>
        <!--顶部轮播图-->
        <swipe></swipe>
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
                    <router-link to="/home/photoList">
                        <img src="../../images/menu2.png" alt="图片分享">
                        <p>图片分享</p>
                    </router-link>
                </div>
                <div class="mui-col-xs-4 navbar-item">
                    <router-link to="/home/goodsList">
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
    import swipe from '../subcomponents/Swipe.vue';
    export default {
        components: {
            swipe
        },
        data(){
            return{
                // imgLists: [],   //轮播图图片
            }
        },
        created(){
            // this.getSwipeImg();
        },
        methods: {
            //获取图片数据,jsonp,此接口是获取电影数据的，
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
        }
    }
</script>

<style lang="less" scoped>

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