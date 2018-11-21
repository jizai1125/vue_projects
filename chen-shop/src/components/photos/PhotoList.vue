<template>
    <div>
        <!--顶部导航栏-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" :key="1" @click="cateId=1;getPhotosByCateId(1)">
                        美图
                    </a>
                    <a class="mui-control-item" :key="4" @click="cateId=4;getPhotosByCateId(4)">
                        动图
                    </a>
                    <a class="mui-control-item" :key="3" @click="cateId=3;getPhotosByCateId(3)">
                        逗比
                    </a>
                    <a class="mui-control-item" :key="" @click="">
                        逼逼
                    </a>
                    <a class="mui-control-item" :key="" @click="">
                        哈哈
                    </a>
                    <a class="mui-control-item" :key="" @click="">
                        呜呜
                    </a>
                    <a class="mui-control-item" :key="" @click="">
                        嘤嘤
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表：美女分类只展示图片-->
        <ul class="photoshare mui-table-view">
            <!---->
            <router-link class="mui-card" v-for="obj in photos" :key="obj.id"
                         :to="'/home/photoInfo/'+obj.id" tag="li">
                <!--头部-->
                <header v-if="cateId!==1" class="mui-card-header mui-card-media">
                    <img :src="obj.avatar" alt="">
                    <div class="mui-media-body">
                        {{obj.username}}
                        <a href="javascript;"><span>关注</span></a>
                        <p>{{obj.ctime | dateFormat}}</p>
                    </div>
                </header>
                <!--内容区-->
                <div class="mui-card-content" style="position: relative;">
                    {{obj.text}}
                    <img v-lazy="cateId===4 ? obj.gif : obj.image" alt="">
                </div>
                <!--底部-->
                <footer v-if="cateId!==1" class="mui-card-footer">
                    <!--flag为true则添加active类，爱心显示为红色-->
                    <span @click="flag=!flag" :class="(flag ? 'active': '')" class="iconfont icon-heart"></span>
                    <a href="javascript;"><span>评论</span></a>
                </footer>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';
    import {Toast} from 'mint-ui';
    export default {
        name: "PhotoShare",
        data(){
            return{
                flag: false,    //爱心颜色标志位
                page: 1,    //请求的参数，页码
                cateId: 1, //图片分类id, 1为美图，3为内容和图片，4为内容和动图
                photos: [], //图片数据
            }
        },
        created(){
            this.getPhotosByCateId(this.cateId);
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.001 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        computed: {
        },
        methods: {
            //根据分类的id获取图片列表
            getPhotosByCateId(cateId) {
                let url=`https://www.apiopen.top/satinGodApi?type=${cateId}&page=1`;
                //美女分类
                if(cateId===1){
                    url=`https://www.apiopen.top/meituApi?page=1`;
                    this.$http.get(url).then(res=>{
                        if(res.body.code!==200){
                            Toast('美女失踪了！');
                        }
                        let dataArr=res.body.data;
                        let tempArr=[];
                        for(let obj of dataArr){
                            tempArr.push({
                                id: Math.floor(Math.random()*1000/Math.random()),
                                ctime: obj.createdAt,
                                image: obj.url
                            })
                        }
                        console.log(tempArr)
                        this.photos=tempArr;
                    })
                    //直接返回
                    return;
                }
                //其他图片分类
                this.$http.get(url).then(res => {
                    if (res.body.code !== 200) {
                        Toast('图片获取失败！');
                    }
                    let dataArr = res.body.data;
                    let tempArr = [];
                    for (let item of dataArr) {
                        tempArr.push({
                            id: item.soureid,
                            username: item.username,
                            avatar: item.header,
                            ctime: item.passtime,
                            image: item.image,
                            gif: item.gif,
                            text: item.text,
                        })
                    }
                    //拼接到实例变量保存
                    this.photos = tempArr;
                    console.log(res)
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }
     .photoshare {
         color: #606060;
         .mui-card {
             box-shadow: 0 5px 10px 1px rgba(0,0,0,.3);
             .mui-card-header {

             }
             .mui-card-content {
                 img[lazy=loading] {    //懒加载样式
                     width: 40px;
                     height: 40px;
                     border-radius :50%;
                     margin: 0 auto;
                 }
                 img {
                     background-color: #ececec;
                     display: block;
                     width: 100%;
                 }
             }
             .mui-card-footer {
                 .icon-heart {
                     /*font-size: 18px;*/
                 }
                 .icon-heart.active {
                     color: red;
                     font-size: 30px;
                 }
             }
         }

     }
</style>