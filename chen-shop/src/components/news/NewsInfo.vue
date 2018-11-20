<template>
    <div>
        <!--<comment :artId="this.id"></comment>-->
        <!--<h1>{{$route.params.id}}</h1>-->
        <iframe width="100%" height="1000px" :src="'https://3g.163.com/all/article/'+id+'.html'" frameborder="0"></iframe>
    </div>
</template>

<script>
    import comment from '../subcomponents/Comment.vue';
    export default {
        name: "NewsInfo",
        components: {
            comment
        },
        data(){
            return{
                id: this.$route.params.id,
            }
        },
        created(){
            // this.getNewsInfo()
        },
        mounted(){
        },
        methods: {
            getNewsInfo(){
                // 1. 通过ajax拿到新闻详情页面
                // this.$http.jsonp('https://3g.163.com/all/article/E0SKNGAP00038FO9.html').then(function(res){
                //     console.log(res)
                // })
                // 2. 渲染到页面中
            }
        }
    }
</script>

<style lang="less" scoped>
    h1 {
        position: absolute;
        top: 0;
        z-index: 999;
    }
    iframe {
        margin-top: -6rem;
    }
</style>