<template>
    <div>
        <ul class="goods-list">
            <!--方式1： a元素跳转-->
            <!--<router-link class="goods-item" v-for="item in goodsList" :key="item.id"-->
                         <!--:to="'/home/goodsInfo/'+item.id" tag="li">-->
                <!--<div class="goods-header">-->
                    <!--<img :src="item.src" alt="">-->
                    <!--<p class="description">{{item.title}}</p>-->
                <!--</div>-->
                <!--<div class="goods-content">-->
                    <!--<p class="price">-->
                        <!--<span class="now">￥{{item.sell_price}}</span>-->
                        <!--<span class="old">￥{{item.market_price}}</span>-->
                    <!--</p>-->
                    <!--<p class="sell">-->
                        <!--<span>热卖中</span>-->
                        <!--<span>剩{{item.sell_leave}}件</span>-->
                    <!--</p>-->
                <!--</div>-->
            <!--</router-link>-->
            <!--方式2： 编程式导航-->
            <li class="goods-item" v-for="item in goodsList" :key="item.id" @click="goInfo(item.id)">
                <div class="goods-header">
                    <img :src="item.src" alt="">
                    <p class="description">{{item.title}}</p>
                </div>
                <div class="goods-content">
                    <p class="price">
                        <span class="now">￥{{item.sell_price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{item.sell_leave}}件</span>
                    </p>
                </div>
            </li>
        </ul>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "goodsList",
        data(){
            return {
                pageIndex: 1,   //商品列表数据的页码
                goodsList: [
                    {
                        id: 1321,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '身份都纷纷解决的分配法定的',
                        sell_price: '无',
                        market_price: 322,
                        sell_leave: 83
                    },
                    {
                        id: 223,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '卡佛的怒放的',
                        sell_price: '无',
                        market_price: 33222,
                        sell_leave: 83
                    },
                    {
                        id: 321,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '阿尔特up额外反倒是发而鹅鹅鹅饿鹅鹅鹅饿',
                        sell_price: '无',
                        market_price: 33222,
                        sell_leave: 843
                    },
                    {
                        id: 43261,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '房东都打开的ue金额就饿哦拍视频搜索四if的',
                        sell_price: '无',
                        market_price: 3222,
                        sell_leave: 833
                    },
                    {
                        id: 6271,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '积分等级佛山东坡',
                        sell_price: '无',
                        market_price: 3222,
                        sell_leave: 86
                    },
                    {
                        id: 84331,
                        src: 'https://avatars2.githubusercontent.com/u/33979706?s=460&v=4',
                        title: '粉色金融股个人不分高低浮动法尔额外热金佛山地点',
                        sell_price: '无',
                        market_price: 343252,
                        sell_leave: 832
                    }
                ], //商品数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            //使用js跳转路由
            goInfo(id){
                //方式1： 字符串
                // this.$router.push('/home/goodsInfo')
                //方式2：对象
                this.$router.push({path: `/home/goodsInfo/${id}`})
                //传查询参数
                // this.$router.push({path: '/home/goodsInfo',query:{id: id}})
                //方式3： 命名的路由，params不能和path一起用，会被忽略
                this.$router.push({name: 'goodsInfo',params:{id}})
            },
            getGoodsList(){
                // 获取商品列表数据
                // this.$http.get('',{}).then(res=>{
                //
                // })
            },
            getMore(){
                // 获取更多商品列表数据
                this.pageIndex++;
                this.getGoodsList();
            },
        }
    }
</script>

<style lang="less" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
        list-style: none;
        li.goods-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 49%;
            min-height: 300px;
            padding: 5px 2px;
            box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
            .goods-header {
                img {
                    width: 100%;
                }
                .description {
                    font-size: 16px;
                    color: #606060;
                }
            }
            .goods-content {
                .price {
                    .now {
                        color: red;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    span:first-child {}
                    span:last-child {}
                }
            }
        }

    }
</style>