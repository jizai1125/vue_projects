<template>
    <h1>商品介绍 id===={{goodsId}}</h1>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data(){
            return {
                goodsId: null,
                info: null,
            }
        },
        created(){
            this.goodsId=this.$route.params.id;
        },
        methods: {
            // 根据id获取详情
            getGoodsDesc(){

            }
        },
    }
</script>

<style scoped>

</style>