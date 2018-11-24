<template>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
        <button class="mui-btn mui-numbox-btn-minus">-</button>
        <input class="mui-numbox-input" type="number" ref="count" @change="countChange"/>
        <button class="mui-btn mui-numbox-btn-plus">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';

    export default {
        name: "Numbox_goodsInfo",
        props: ['max'], //max为设置选择框的最大值
        data(){
            return {}
        },
        created(){
            // console.log(this.max)
        },
        mounted(){
            //初始化数字输入框，一定要在mounted方法里调用，否则会报错哦，因为要等元素挂载到DOM树，选择器才能选择到
            mui('.mui-numbox').numbox().setValue(1);
        },
        methods: {
            countChange(){
                this.$emit('getCount',this.$refs.count.value)
            }
        },
        watch: {
            //因为父组件传来的max值是异步获取的，所以还没获取到之前max是undefined，可通过监听更新
            max: function(newVal,oldVal){
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style scoped>

</style>