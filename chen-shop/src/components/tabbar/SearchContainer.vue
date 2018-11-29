<template>
    <div>
        <form action="" class="mui-input-group">
            <div class="mui-input-row mui-search">
                <input type="text" v-model="key" class="mui-input-clear" placeholder="古诗词...">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" @click="getPoetry">搜索</button>
            </div>
        </form>
        <div class="poetry mui-card" v-for="(item,index) in poetries" :key="index">
            <div class="mui-card-content mui-text-center">
                <h1 class="title">{{item.title}}</h1>
                <p>{{item.author}}</p>
                <p v-for="statement in item.content">{{statement}}</p>
            </div>
        </div>
        <mt-spinner v-show="spinnerFlag" class="spinner" :type="1" :size="50" color="#007aff"></mt-spinner>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "search",
        data(){
            return{
                spinnerFlag: false,
                key: '',
                poetries: [],
            }
        },
        created(){
        },
        mounted(){
        },
        methods: {
            getPoetry(){
                this.spinnerFlag=true;
                this.$http.get('https://api.apiopen.top/likePoetry',{params:{name: this.key}}).then(result=>{
                    var res=result.body.result;
                    if(result.body.code!==200){
                        Toast('搜索失败！');
                        this.spinnerFlag=false;
                        return;
                    }
                    if(res.length===0){
                        Toast({
                            message: '不存在的！',
                            duration: 1000
                        });
                        this.spinnerFlag=false;
                        return;
                    }
                    var tempArr=[];
                    for(let item of res){
                        tempArr.push({
                            title: item.title,
                            author: item.authors,
                            content: item.content.split('|')
                        })
                    }
                    this.poetries=tempArr;
                    this.spinnerFlag=false;
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .mui-input-group {
        border: 0;
        margin: 6px auto;
    }
    .poetry.mui-card {
        box-shadow: 0 1px 2px #007aff;
        .title {
            font-size: 16px;
            font-weight: lighter;
        }
    }
    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -25px;
        margin-top: -25px;
    }
</style>