<template>
    <div>
        <h3>图片详情---{{infoId}}</h3>
        <p class="subtitle">
            <span>发表时间：3020-32-32 12:21:21</span>
            <span>浏览量：0 次</span>
        </p>
        <hr>
        <!--缩略图区域 关掉分享按钮 :options="{shareEl: false}-->
        <vue-picture-swipe :items="thumbnail" :options="{shareEl: false}">
        </vue-picture-swipe>
        <!--图片内容-->
        <p>hi浮动发送订票费恩发的开发的经费都是覅第三方了</p>
        <!--comment评论子组件-->
        <comment :id="infoId"></comment>
    </div>
</template>

<script>
    // 导入评论组件
    import  comment from  '../subcomponents/Comment.vue';
    export default {
        name: "PhotoInfo",
        components: {
            comment,
        },
        data(){
            return {
                infoId: null, //详情页对应的id
                photoInfo: {}, //详情信息
                thumbnail: [    //缩略图预览设置
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4', //预览图图
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4', //缩略图
                        w: 300, //预览图宽度
                        h: 300, //预览图高度
                        title: '300'    //底部标题
                    },
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                        w: 400,
                        h: 400,
                        title: '400'
                    },
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                        w: 500,
                        h: 500,
                        title: '500'
                    },
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                        w: 700,
                        h: 700,
                        title: '700'
                    },
                ]
            }
        },
        created(){
            this.infoId=this.$route.params.id;
        },
        methods: {
            getPhotoInfo(){
                // 获取图片详情
                this.$http.get().then(response=>{

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .subtitle {
        margin: 5px 2px;
        display: flex;
        justify-content: space-between;
    }
    hr {
        margin: 0;
    }
</style>