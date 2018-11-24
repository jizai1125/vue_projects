<template>
    <div class="shopcarList">
        <h1>shopcar</h1>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch></mt-switch>
                    <img src="../../images/menu1.png" alt="">
                    <div class="info">
                        <h1>小米积分多少反倒是法尔符文法师废物是否违反</h1>
                        <p>
                            <span class="price">￥320</span>
                            <numbox></numbox>
                            <a href="#">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--结算-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    Fsdfew佛挡杀佛fdsfsdfdsfds
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/Numbox_ShopCar.vue'
    export default {
        name: "shopcar",
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            numbox
        }
    }
</script>

<style lang="less" scoped>
    .shopcarList {
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
        }
        img {
            width: 60px;
            height: 60px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                margin: 0;
            }
            h1 {
                font-size: 13px;
            }
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
</style>