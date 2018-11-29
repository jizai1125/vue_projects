<template>
    <div>
        <div class="mui-card" v-for="(item,i) in videoList" :key="i">
            <div class="mui-card-content">
                <video ref="video" controls width="100%" :src="item.url"></video>
            </div>
                <p class="mui-text-center">{{item.time | dateFormat}}</p>
        </div>
        <mt-spinner v-show="spinnerFlag" class="spinner" :type="2" :size="50"></mt-spinner>
    </div>
</template>
<!--1.点击屏幕显示控制组件，过5s后隐藏控制组件，-->
<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "VideoList",
        data(){
            return {
                spinnerFlag: true,
                videoList: [],
            }
        },
        created(){
            this.getVideoList();
        },
        updated(){
        },
        methods: {
            getVideoList(){
                this.$http.get('https://api.apiopen.top/todayVideo').then(res=>{
                    if(res.body.code!==200){
                        Toast({
                            message: '视频获取失败！',
                            duration: 500
                        });
                        this.spinnerFlag=false;
                        return;
                    }
                    var result=res.body.result;
                    var tempArr=[];
                    result.forEach((item,i)=>{
                        if(i<=0)return;
                        if(item.data.header){
                            tempArr.push({
                                id: item.id,
                                time: item.data.header.time,
                                url: item.data.content.data.playUrl
                            })
                        }

                    })
                    this.videoList=tempArr;
                    this.spinnerFlag=false;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all .4s ease;
    }
    .controls {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 50px;
        height: 50px;
        text-align: center;
    }
    .icon-play,
    .icon-pause {
        color: #e8e8e8;
        font-size: 40px;
        line-height: 50px;
    }
    .spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
    }
</style>