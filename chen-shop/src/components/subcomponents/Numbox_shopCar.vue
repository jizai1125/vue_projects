<template>
    <div class="mui-numbox" style="height: 30px;">
        <button class="mui-btn mui-numbox-btn-minus">-</button>
        <input class="mui-numbox-input" type="number" ref="count" @change="countChange"/>
        <button class="mui-btn mui-numbox-btn-plus">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';

    export default {
        name: "Numbox_shopCar",
        data(){
            return {}
        },
        mounted(){
            //初始化数字输入框，一定要在mounted方法里调用，否则会报错哦，因为要等元素挂载到DOM树，选择器才能选择到
            mui('.mui-numbox').numbox().setValue(1);
        },
        methods: {
            countChange(){
            }
        }
    }
</script>

<style scoped>

</style>