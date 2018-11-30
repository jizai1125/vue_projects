<template>
    <div>
        <div class="video" @click="isShowControls=!isShowControls">
            <!--视频-->
            <video ref="video"
                   @canplay="canPlay=true;isShowControls=true;
                   getTotalTime();getCurrentTime()"
                   @timeupdate="getCurrentTime();setProgress()"
                   @ended="isPlay=false"
                   :src='src'>
            </video>
            <!--提示-->
            <h1 v-show="!canPlay">无法播放</h1>
            <!--控制区-->
            <transition name="fade">
                <div v-show="isShowControls">
                    <!--播放/暂停按钮-->
                    <div class="controls" @click.stop="isPlay=!isPlay;toggleControl(isPlay)">
                        <span v-if="isPlay" class="pause iconfont icon-pause" key="pause"></span>
                        <span v-else class="play iconfont icon-play" key="play"></span>
                    </div>
                    <!--播放进度显示-->
                    <div class="time">
                        <p class="tips">
                            <span>{{currentTime.minutes}}:{{currentTime.seconds}}</span>
                            <span>/ {{totalTime.minutes}}:{{totalTime.seconds}}</span>
                        </p>
                        <p ref="progress" class="progress">
                            <span class="current"></span>
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    //参数： 总时长，已播放时长
    //默认暂停，显示播放按钮
    //1. 点击播放按钮，播放视频，显示暂停图标，切换暂停控制
    //2. 显示控制按钮时，点击其他地方，隐藏控制区域，隐藏后点击屏幕，显示控制区
    export default {
        name: "VideoControl",
        props: ['src'],
        data(){
            return {
                canPlay: false,  //视频是否可以播放
                isShowControls: false, //是否显示控件
                isPlay: false, //当前是否处于播放状态
                totalTime: 0, //时长，单位秒
                currentTime: 0, //当前播放位置，单位秒,
            }
        },
        mounted(){
        },
        methods: {
            // 切换播放和暂停，
            // isPlay=true,则点击后播放视频，isPlay=false,则相反
            toggleControl(isPlay){
                let video=this.$refs.video;
                    if(isPlay){
                        //播放
                        video.play();
                        //播放时隐藏控件
                        this.isShowControls=false;
                    }else {
                        //暂停
                        video.pause();
                    }
            },
            //获取总时长
            getTotalTime(){
                let video=this.$refs.video;
                this.totalTime={
                    hour: Math.round(video.duration/3600).toString().padStart(2,'0'),
                    minutes: Math.round(video.duration/60).toString().padStart(2,'0'),
                    seconds: Math.round(video.duration%60).toString().padStart(2,'0')
                }
            },
            //获取已播放时长
            getCurrentTime(){
                let video=this.$refs.video;
                this.currentTime={
                    hour: Math.round(video.currentTime/3600).toString().padStart(2,'0'),
                    minutes: Math.round(video.currentTime/60).toString().padStart(2,'0'),
                    seconds: Math.round(video.currentTime%60).toString().padStart(2,'0')
                };
            },
            //设置进度条
            setProgress(){
                // 时间占比，currentTime/duration
                let percent=this.$refs.video.currentTime/this.$refs.video.duration;
                let progress=this.$refs.progress;
                let width=progress.offsetWidth;
                //设置进度的宽度
                if(percent>0.99){
                    percent=1
                }
                progress.lastChild.style.width=percent*width+'px';
            }
        }
    }
</script>

<style lang="less" scoped>
.video {
    position: relative;
    /*text-align: center;*/
    h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        font-weight: lighter;
    }
    video {
        width: 100%;
        height: 100%;
        display: block;
    }
     /*播放/暂停按钮*/
    .controls {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        width: 50px;
        height: 50px;
        .icon-pause,
        .icon-play {
            font-size: 40px;
            color: #e3e3e3;
        }
        .play,
        .pause {
            position: absolute;
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            line-height: 50px;
            text-align: center;
        }
    }
    /*时间、进度条*/
    .time {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        .tips {
            position: absolute;
            top: -22px;
            right: 0;
            width: 90px;
            height: 20px;
            color: #fff;
        }
        .progress {
            margin: 0;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #606060;
            .current {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: #ececec;
            }
        }
    }
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 1s linear;
}
</style>