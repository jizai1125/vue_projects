<template>
    <div>
        <h4>发表评论-----{{artId}}</h4>
        <hr>
        <!--发表评论-->
        <form action="javascript;" class="comment">
            <textarea name="content" id="" rows="5" maxlength="120" placeholder="输入评论内容(最多120个字)" title=""></textarea>
            <mt-button type="primary" size="large">发表评论</mt-button>
        </form>
        <!--评论列表-->
        <ul class="cms-list mui-table-view">
            <li class="cms-item mui-table-view-cell mui-media" v-for="user in commentList" :key="user.id">
                <img class="mui-media-object mui-pull-left" :src="user.avatar" alt="">
                <div class="mui-media-body">
                    {{user.userName}}
                    <p>{{user.content}}
                        <span class="mui-pull-right">{{user.ctime | dateFormat}}</span>
                    </p>
                </div>
            </li>

        </ul>
        <mt-button type="danger" size="large">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "Comments",
        props: ['artId'],
        data(){
            return {
                pageIndex: 1,
                artistId: 27610708,
                commentList: [],
            }
        },
        created(){
            this.getComments();
        },
        methods: {
            //获取评论数据
            getComments(){
                this.$http.get('https://www.apiopen.top/satinCommentApi',{params:{id:this.artistId,page: this.pageIndex}})
                    .then(function(res){
                        console.log(res)
                        if(res.body.code!==200){
                            Toast('获取评论失败！');
                        }
                        //保存响应的数据
                        var userData=res.body.data.normal.list;
                        //1.选取响应数据中的选项，创建数组存储用户对象数据，
                        var users=[];
                        for(var item of userData){
                            users.push({
                                id: item.id,
                                userName: item.user.username,
                                avatar: item.user.profile_image,
                                content: item.content,
                                ctime: item.ctime,
                            })
                        }
                        //将数组传给传给实例变量commentList
                        this.commentList=users;
                    })
                    .catch(function(err){
                        // console.log(err.status)
                        Toast('获取评论失败！');
                    })
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
        .cms-item {
            img {
                border-radius: 50%;
            }
        }
    }
    .mint-button {

    }
</style>