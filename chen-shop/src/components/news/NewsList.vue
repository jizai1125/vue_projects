<template>
    <div>
        <ul class="mui-table-view">
            <!--第一种视图-->
            <li class="mui-card" v-for="news in newsList">
                <router-link :to="'/home/newsInfo/'+news.docid">
                <div class="bg" :style="'background-image:url('+news.picInfo[0].url+')'">
                </div>
                <div class="mui-card-content mui-ellipsis">
                        <h4>{{news.title}}</h4>
                        <p>{{news.digest}}</p>
                </div>
                <div class="mui-card-footer">
                    <span class="time">{{news.ptime | dateFormat}}</span>
                    <span class="visitors">浏览量：{{news.tcount}}</span>
                    <span>{{news.source}}</span>
                </div>
                </router-link>
            </li>
            <!--第二种视图-->
            <!--<li class="mui-table-view-cell mui-media" v-for="news in newsList">-->
                <!--<router-link :to="'/home/newsinfo/'+news.docid">-->
                    <!--<img class="mui-media-object mui-pull-left" :src="news.picInfo[0].url" alt="">-->
                    <!--<div class="mui-media-body">-->
                        <!--<h4>{{news.title}}</h4>-->
                        <!--<p>{{news.digest}}</p>-->
                        <!--<p class="mui-ellipsis">-->
                            <!--<span class="time">{{news.ptime | dateFormat}}</span>-->
                            <!--<span class="visitors">浏览量：{{news.tcount}}</span>-->
                            <!--<span>{{news.source}}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</router-link>-->
            <!--</li>-->
        </ul>
        <!--加载图标-->
        <mt-spinner v-show="flag" type="fading-circle" :size="60" color="#007aff" class="loading"></mt-spinner>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                flag: true,
                time: new Date(),
                newsList: [],
            }
        },
        created(){
          this.getNews();
        },
        updated(){
            this.flag=false;
        },
        components: {

        },
        //hasad=1&miss=57&refresh=A&offset=0&size=10&callback=syrec3
        methods: {
            getNews(){
                this.$http.jsonp("http://3g.163.com/touch/jsonp/sy/recommend/10-40.html",{size: 80}).then(res=>{
                    if(!res.ok && res.status!==200){
                        Toast('获取新闻失败！');
                        return;
                    }
                    this.newsList=res.body.news;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .mui-card {
        .bg {
            height: 250px;
            background-repeat: no-repeat;
            background-size: cover;
        }
        h4 {
            color: #323232;
            font-size: 18px;
            font-weight: normal;
        }
    }
    .mui-table-view {
        z-index: 999;
        .mui-table-view-cell {
            /*padding: 20px;*/
            img {
                border-radius: 50%;
                max-width: 80px;
                height: 80px;
            }
            .mui-media-body{
                height: 80px;
                line-height: 30px;
                h4 {
                    font-size: 18px;
                    font-weight: normal;
                    font-family: "Microsoft YaHei UI", Sans-Serif;
                }
                .mui-ellipsis {
                    display: flex;
                    justify-content: space-between;
                    .time {}
                    .visitors {}
                }
            }
        }
    }
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        z-index: 999;
    }
</style>