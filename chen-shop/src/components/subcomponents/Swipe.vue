<template>
    <div>
        <mt-swipe :auto="4000" ref="swipe"  @change="">
            <mt-swipe-item v-for="(item,i) in items" :key="i">
                <img :src="item.src" alt="" :class="{'full': isFull}">
            </mt-swipe-item>
        </mt-swipe>
        <!--<button @click="prev">pre</button>-->
        <!--<button @click="next">next</button>-->
    </div>
</template>

<script>
    export default {
        props:['items','isFull'], //items为图片资源数组，isFull为设置宽度是否100%
        name: "Swipe",
        data(){
            return{

            }
        },
        methods: {

            //控制轮播图切换下一张
            next(){
                this.$refs.swipe.next()
            },

            //控制轮播图切换上一张
            prev(){
                console.log(this.$refs.swipe)
                this.$refs.swipe.prev();
            },
        },
    }
</script>

<style lang="less" scoped>
    /*轮播图*/
    .mint-swipe {
        height: 250px;
        @media screen and (min-width: 500px) {
            & {
                height: 350px;
            }
        }
        @media screen and (min-width: 900px) {
            & {
                height: 550px;
            }
        }
        .mint-swipe-item {
            text-align: center;
            img {
                height: 100%;
            }
        }
        .full {
            width: 100%;
        }
    }
</style>