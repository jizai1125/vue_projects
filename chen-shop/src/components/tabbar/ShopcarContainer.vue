<template>
    <div class="shopcarList">
        <!--{id: 商品id, count: 商品数量， price: 商品单价，selected: 商品是否被选中}-->
        <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch></mt-switch>
                    <img src="../../images/menu1.png" alt="">
                    <div class="info">
                        <h1>小米{{item.id}}</h1>
                        <p>
                            <span class="price">￥{{item.price}}</span>
                            <numbox :goodsId="item.id" :count="item.count"></numbox>
                            <a href="#" @click.prevent="delGoods(item.id,index)">删除</a>
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
    import numbox from '../subcomponents/Numbox_shopCar.vue'
    export default {
        name: "shopcar",
        data(){
            return {
                //思路： 根据store里的商品id发送请求获取商品相关的数据
                // 因为没有接口，所以直接将store里的数据赋值给goodsList
                goodsList: [], //商品列表
            }
        },
        created(){
            this.goodsList=this.$store.state.shopCar;
            // this.getGoodsList();
        },
        updated(){
        },
        methods: {
            //根据id获取商品列表
            getGoodsList(){
                var idArr=[]; //购物车所有商品id
                this.$store.state.shopCar.forEach(item=>{
                    idArr.push(item.id)
                })
                // this.$http.get('url'+idArr.join(',')).then(result=>{
                //
                //
                // })
            },
            delGoods(id,index){
                this.goodsList.splice(index,1)
                this.$store.commit('removeGoods',id)
            }
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