<template>
    <div>
        <h4>发表评论-----{{id}}</h4>
        <hr>
        <!--发表评论-->
        <form action="javascript;" class="comment">
            <textarea v-model="content" name="content" id="" rows="5" maxlength="120" placeholder="输入评论内容(最多120个字)" title=""></textarea>
            <mt-button @click.prevent="postComment" type="primary" size="large">发表评论</mt-button>
        </form>
        <!--评论列表-->
        <div ref="cmstBox" class="box" style="height: 200px; overflow: scroll;">
            <!--上拉刷新-->
            <mt-loadmore style="min-height: 200px;" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <!--热评-->
            <ul class="cms-list mui-table-view">
                <li class="cms-item mui-table-view-cell mui-media" v-for="user in hotComments" :key="user.id">
                    <img class="mui-media-object mui-pull-left" :src="user.avatar" alt="">
                    <div class="mui-media-body">
                        <p>{{user.userName}}
                            <span class="mui-pull-right iconfont icon-reping" style="color: #FF0000;"></span>
                        </p>
                        {{user.content}}
                        <p >
                            <span class="mui-pull-right">{{user.ctime | dateFormat}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            <!--其他评论-->
            <ul class="cms-list mui-table-view">
                <li class="cms-item mui-table-view-cell mui-media" v-for="(user,index) in normalComments" :key="user.id">
                    <img class="mui-media-object mui-pull-left" :src="user.avatar" alt="">
                    <div class="mui-media-body">
                        <p>{{user.userName}}
                            <span class="mui-pull-right">{{index}}楼</span>
                        </p>
                        {{user.content}}
                        <p>
                            <span class="mui-pull-right">{{user.ctime | dateFormat}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        </div>
        <!--点击时，调用方法获取评论数据-->
        <mt-button type="danger" size="large" @click="loadMore" >加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "Comments",
        props: ['id'],
        computed: {
        },
        data(){
            return {
                content: '',    //发表评论内容
                allLoaded: false,
                pageIndex: 1,
                artistId: 27610708,
                hotComments: [], //热评数据
                normalComments: [],    //保存其他评论数据
            }
        },
        created(){
            this.getHotComments()
        },
        methods: {
            //添加评论，需要保存到服务器，然后在请求刷新评论，因为没有服务器所以只添加到数组
            postComment(){
                //文本框校验
                if(!this.content.trim()){
                    Toast({
                        message: '不能为空！',
                        duration: 500,
                    });
                    return;
                }
                //提交表单 参数1：url, 参数2：数据对象，参数3：定义提交表单中的数据格式 emulateJSON=true
                // this.$http.post('http://jizai.com').then();
                //手动添加到评论数组开头
                let id=Math.random()*1000*Math.random()*1000;
                this.hotComments.unshift({
                    id: id,
                    userName: 'jizai',
                    avatar: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                    content: this.content,
                    ctime: Date.now(),
                })
            },
            //上拉加载评论
            loadBottom(){
                setTimeout(args=>{
                    this.$refs.loadmore.onBottomLoaded()
                    this.loadMore()
                },500)
            },
            //获取热评数据
            getHotComments(){
                this.$http.get('https://www.apiopen.top/satinCommentApi',{params:{id:this.artistId,page: this.pageIndex}})
                    .then(function(res){
                        //热评数据
                        var cmts_hot=res.body.data.hot.list;
                        //保存热评数据
                        var cmts_hot_arr=[];
                        for(let obj of cmts_hot){
                            cmts_hot_arr.push({
                                id: obj.id,
                                userName: obj.user.username,
                                avatar: obj.user.profile_image,
                                content: obj.content,
                                ctime: obj.ctime,
                            })
                        }
                        this.hotComments=cmts_hot_arr;
                    })
            },
            //获取评论数据
            getComments(){
                var _this=this;
                this.$http.get('https://www.apiopen.top/satinCommentApi',{params:{id:this.artistId,page: this.pageIndex}})
                    .then(function(res){
                        console.log(res)
                        //其他评论数据
                        var cmts_normal=res.body.data.normal.list;
                        if(res.body.code!==200){
                            Toast('获取评论失败！');
                            return;
                        }
                        if(cmts_normal.length===0){
                            Toast('已加载全部！');
                            //关闭loadmore上拉刷新
                            _this.allLoaded=true;
                            return;
                        }
                        //保存其他评论数据
                        var normalArr=[];
                        for(var item of cmts_normal){
                            normalArr.push({
                                id: item.id,
                                userName: item.user.username,
                                avatar: item.user.profile_image,
                                content: item.content,
                                ctime: item.ctime,
                            })
                        }
                        //传给实例变量normalComments,每当请求时，将数据拼接到数组
                        this.normalComments=this.normalComments.concat(normalArr);
                    })
                    .catch(function(err){
                        // console.log(err.status)
                        Toast({
                            message: '获取评论失败！',
                            duration: 1000
                        });
                    })
            },
            //获取更多评论
            loadMore(){
                this.pageIndex++;
                this.getComments()
            }
        }
    }
</script>

<style lang="less" scoped>
    .comment {
        textarea {
            margin: 0;
        }
    }
    .cms-list {
        font-size: 16px;
        color: #323232;
        .cms-item {

            img {
                border-radius: 50%;
            }
        }
    }
    .mint-button {

    }
</style>