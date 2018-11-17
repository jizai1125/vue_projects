<template>
    <div>
        <ul class="mui-table-view newsList">
            <li class="mui-table-view-cell mui-media" v-for="news in newsList">
                <a href="#">
                    <img class="mui-media-object mui-pull-left" src="" alt="">
                    <div class="mui-media-body">
                        <h4>{{news.title}}</h4>
                        <p class="mui-ellipsis">
                            <span class="time">{{news.ptime | dateFormat}}</span>
                            <span class="visitors">浏览量：{{news.tcount}}</span>
                            <span>{{news.source}}</span>
                        </p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                time: new Date(),
                newsList: [],
            }
        },
        created(){
          this.getNews();
        },
        //hasad=1&miss=57&refresh=A&offset=0&size=10&callback=syrec3
        methods: {
            getNews(){
                this.$http.jsonp("http://3g.163.com/touch/jsonp/sy/recommend/10-40.html",{size: 80}).then(res=>{
                    console.log(res)
                    if(!res.ok && res.status!==200){
                        Toast('获取新闻失败！');
                        return;
                    }
                    this.newsList=res.body.news.concat(res.body.list);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .newsList {
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
</style>