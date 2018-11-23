<template>
    <div>
        <comment :id="this.goodsId"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/Comment.vue';
    export default {
        data(){
            return {
                goodsId: null,
            }
        },
        created(){
            this.goodsId=this.$route.params.id;
        },
        methods: {
            // 根据id获取评论
            getComments(){

            }
        },
        components: {
            comment
        }
    }
</script>

<style lang="less" scoped>

</style>