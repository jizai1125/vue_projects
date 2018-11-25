<template>
    <div>
        <!--小球过渡动画-->
        <!--<transition>-->
            <!--<span @animationend="animationend" v-if="flag" class="ball mui-badge mui-badge-danger">1</span>-->
        <!--</transition>-->
        <!--图片展示-->
       <div class="mui-card">
           <swipe class="mui-card-content" :items="imagesList"></swipe>
       </div>
        <!--商品购买-->
        <div class="mui-card shop">
            <div class="mui-card-header">
                {{goodsInfo.title}}{{goodsId}}
            </div>
            <div class="mui-card-content">
                <p class="price">
                    市场价：<del>￥{{goodsInfo.price_market}}</del>&nbsp;&nbsp;
                    销售价：<span class="now">￥{{goodsInfo.price_sell}}</span>
                </p>
                <p>购买数量：
                    <numbox :max="goodsInfo.stock" @getCount="getCount"></numbox>
                </p>
            </div>
            <div class="mui-card-footer">
                <button typeof="button" class="mui-btn mui-btn-danger" @click="addToShopCar">加入购物车</button>
                <button typeof="button" class="mui-btn mui-btn-primary">立即购买</button>
            </div>
        </div>
        <!--商品详情、评论-->
        <div class="mui-card product_des">
            <div class="mui-card-header">
                商品参数
            </div>
            <div class="mui-card-content">
                <p>商品货号 ：{{goodsInfo.goods_no}}</p>
                <p>库存情况 ：{{goodsInfo.stock}}件</p>
                <p>上架时间 ：{{goodsInfo.add_time}}</p>
            </div>
            <div class="mui-card-footer">
                <!--两种方式实现路由跳转-->
                <router-link tag="button" to="/home/goodsDesc/32" type="button" class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</router-link>
                <button @click="goComments(goodsId)" type="button" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入轮播子组件
    import swipe from '../subcomponents/Swipe.vue';
    //导入数字输入框组件
    import numbox from '../subcomponents/Numbox_goodsInfo.vue';
    export default {
        name: "GoodsInfo",
        data(){
            return {
                goodsId: null, //商品id
                selectedCount: 1,
                imagesList: [//轮播图图片
                    {src: '/src/images/menu1.png'},
                    {src: '/src/images/menu2.png'},
                    {src: '/src/images/menu3.png'},
                    {src: '/src/images/menu4.png'},
                ],
                goodsInfo: {
                        id: this.goodsId,
                        title: '小米Note',
                        add_time: Date.now(),
                        goods_no: 'SD80750323',
                        price_market: 2699,
                        price_sell: Math.floor(2300*Math.random()),
                        stock: 23
                    },

            }
        },
        created(){
            this.goodsId=this.$route.params.id;
        },
        mounted(){
        },
        methods: {
            // 根据 goodsId 获取轮播图图片
            getImagesList(){
              this.$http.get().then()
            },
            //根据 goodsId 获取商品详情数据
            getGoodsInfo(){
              this.$http.get().then()
            },
            //获取numbox子组件的数值
            getCount(count){
              this.selectedCount=count;
              // console.log(this.selectedCount)
            },
            //商品数据添加到购物车
            addToShopCar(){
                // 1.拼接一个商品信息对象id,price,count,selected
                let goodsInfo={
                    id: this.goodsId,
                    count: this.selectedCount,
                    price: this.goodsInfo.price_sell,
                    selected: true
                }
                //2. 保存到store的state中
                this.$store.commit('addToShopCar',goodsInfo)
            },
            //跳转到评论页
            goComments(id){
                this.$router.push({name: 'goodsCmts', params: {id}})
            },
            //监听动画结束事件
            // animationend(){
            //     this.flag=false
            // }
        },
        components: {
            swipe,
            numbox,
        },
    }
</script>

<style lang="less" scoped>
    .mui-card {
        min-height: 200px;
        box-shadow: 0 1px 10px 2px rgba(0,0,0,.5);
        @media screen and (min-width: 900px) {
            & {
                min-height: 300px;
            }
        }
        &.shop,
        &.product_des {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 5px;
            .mui-card-content{
                .price {
                    .now {
                        color: red;
                        font-size: 16px;
                    }
                }
            }
            .mui-btn {
                width: 40%;
            }
        }
    }
</style>