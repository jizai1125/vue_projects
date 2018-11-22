<template>
    <div>
        <mt-swipe :auto="4000" ref="swipe" @change="">
            <mt-swipe-item><img src="../../images/l1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l3.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../images/l4.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
        <!--<button @click="prev">pre</button>-->
        <!--<button @click="next">next</button>-->
    </div>
</template>

<script>
    export default {
        name: "Swipe",
        data(){},
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
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
</style>