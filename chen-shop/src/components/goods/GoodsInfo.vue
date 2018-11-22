<template>
    <div>
        <!--图片展示-->
       <div class="mui-card">
           <swipe class="mui-card-content"></swipe>
       </div>
        <!--商品购买-->
        <div class="mui-card shop">
            <div class="mui-card-header">
                小米Note{{goodsId}}全网通
            </div>
            <div class="mui-card-content">
                <p class="price">
                    市场价：<span class="old">￥2799</span>
                    销售价：<span class="now">￥1111</span>
                </p>
                <p>购买数量：
                    <input type="button" value="-">
                    <input type="button" value="1">
                    <input type="button" value="+">
                </p>
            </div>
            <div class="mui-card-footer">
                <button typeof="button" class="mui-btn mui-btn-danger" >加入购物车</button>
                <button typeof="button" class="mui-btn mui-btn-primary">立即购买</button>
            </div>
        </div>
        <div class="mui-card product_des">
            <div class="mui-card-header">
                商品参数
            </div>
            <div class="mui-card-content">
                <p>商品货号 ： <span>SF4323342043</span></p>
                <p>库存情况 ： <span>60</span>件</p>
                <p>上架时间 ：<span>2018-13-12 12:21:11</span></p>
            </div>
            <div class="mui-card-footer">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</button>
                <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入轮播子组件
    import swipe from '../subcomponents/Swipe.vue';
    export default {
        name: "GoodsInfo",
        components: {
            swipe
        },
        data(){
            return {
                goodsId: null, //商品id
                images: [
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4', //预览图图
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4', //缩略图
                        w: 300, //预览图宽度
                        h: 300, //预览图高度
                        title: '300'    //底部标题
                    },
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                        w: 400,
                        h: 400,
                        title: '400'
                    },
                    {
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        thumbnail: 'https://avatars0.githubusercontent.com/u/33979706?s=40&v=4',
                        w: 500,
                        h: 500,
                        title: '500'
                    },
                ],
            }
        },
        created(){
            this.goodsId=this.$route.params.id;
        }
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
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                    }
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