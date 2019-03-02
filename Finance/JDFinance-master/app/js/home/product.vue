<template>
    <Panel title="新品推荐" :class="$style.productPanel">
        <section :class="$style.content">
            <router-link to="home" :class="$style.more">更多尖货>></router-link>
            <Slider :options="swiperOption" :items="products" cname="product"/>
        </section>
    </Panel>
</template>

<script>
import Panel from "../core/panel.vue"
import Slider from "../core/slider.vue"

export default {
    name: "News",
    components: {
        Panel,
        Slider,
    },
    data() {
        return {
            products: [
                {
                    id: 1,
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/8400/39/12559/14819/5c387a22Eb2b1d29f/70588a5a61bfdde1.jpg?width=335&height=421",
                },
                {
                    id: 2,
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/7388/5/12769/16802/5c387a23Ee497f7d9/e593f68e29afa8b6.jpg?width=335&height=421",
                },
                {
                    id: 3,
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/11417/29/6015/31505/5c387a28E3756cc25/0707389bbdefb14d.jpg?width=335&height=421",
                },
                {
                    id: 4,
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/7388/5/12769/16802/5c387a23Ee497f7d9/e593f68e29afa8b6.jpg?width=335&height=421",
                },
            ],
            swiperOption: {
                slidesPerView: 2.4,
                spaceBetween: 30,
                freeMode: true,
            },
        }
    },
}
</script>

<style lang="scss">
    /*这里的样式不能启用css module，否则内置的选择器选不到*/
    .product {
        .swiper-container {
            box-sizing: border-box;
            padding: 0 24px;
            .swiper-slide {
                a {
                    display: inline-block;
                    width: 100%;
                    img {
                        display: block;
                        width: 100%;
                        height: 314px;
                        border: 1px solid #fafafa;
                    }
                }
            }
        }
    }
</style>

<style lang="scss" module>
 .productPanel {
     position: relative;
     .content {
         padding-bottom: 40px;
         .more {
             display: inline-block;
             position: absolute;
             right: 10px;
             top: 44px;
             color: #999;
             text-decoration: none;
             font-size: 25px;
         }
     }
 }
</style>
