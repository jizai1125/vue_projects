<template>
    <div class="mui-numbox" style="height: 30px;">
        <button class="mui-btn mui-numbox-btn-minus">-</button>
        <input class="mui-numbox-input" ref="numbox" readonly type="number" :value="count" @change="countChange"/>
        <button class="mui-btn mui-numbox-btn-plus">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';

    export default {
        props: ['count','goodsId'],
        data(){
            return {}
        },
        mounted(){
            //初始化数字输入框，一定要在mounted方法里调用，否则会报错哦，因为要等元素挂载到DOM树，选择器才能选择到
            mui('.mui-numbox').numbox();
        },
        methods: {
            countChange(){
                //当数量count为0时，从购物车钩删除商品
                let count=parseInt(this.$refs.numbox.value);
                if(count<=0){
                    this.$store.commit('removeGoods',this.goodsId)
                }
                this.$store.commit('updateGoodsCount',{
                    id: this.goodsId,
                    count: this.$refs.numbox.value
                })
            }
        }
    }
</script>

<style scoped>

</style>