<template>
    <div class="">
        <Slider :items="items" :cname="$style.slider"/>
        <section :class="$style.list">
            <div :class="$style.item" v-for="item in enters" :key="item.id">
                <router-link :to="item.href">
                    <img :src="item.img" :alt="item.title">
                    <h4>{{ item.title }}</h4>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
import Slider from "../core/slider.vue"
export default {
    name: "SliderHome",
    components: {
        Slider,
    },
    data() {
        return {
            text: "fafa",
            items: [
                {
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/10219/37/10193/38106/5c5258c8Eac6f81e8/8bee6874591b5bf4.jpg?width=750&height=320",
                }, {
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/10219/37/10193/38106/5c5258c8Eac6f81e8/8bee6874591b5bf4.jpg?width=750&height=320",
                }, {
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/10219/37/10193/38106/5c5258c8Eac6f81e8/8bee6874591b5bf4.jpg?width=750&height=320",
                }, {
                    href: "home",
                    src: "https://img12.360buyimg.com/jrpmobile/jfs/t1/10219/37/10193/38106/5c5258c8Eac6f81e8/8bee6874591b5bf4.jpg?width=750&height=320",
                },
            ],
            enters: [
                {
                    id: 1,
                    href: "home",
                    img: "https://img12.360buyimg.com/jrpmobile/jfs/t3991/64/2521945388/12110/93c0139/58d1e462Ncf294123.png?width=132&height=132",
                    title: "优惠券",
                }, {
                    id: 2,
                    href: "home",
                    img: "https://img12.360buyimg.com/jrpmobile/jfs/t5590/252/875247023/17343/946aa72c/59224650N0f7ffc92.png?width=132&height=132",
                    title: "领福利",
                }, {
                    id: 3,
                    href: "home",
                    img: "https://img12.360buyimg.com/jrpmobile/jfs/t4393/329/2180608902/13217/c88c0cec/58ec9dcdN1534e2d7.png?width=132&height=132",
                    title: "抢钢镚",
                }, {
                    id: 4,
                    href: "home",
                    img: "https://img12.360buyimg.com/jrpmobile/jfs/t5488/298/1036263348/12073/b4f4de97/590ac8e8Ne9def22e.png?width=135&height=135",
                    title: "白条提额",
                },
            ],
        }
    },
}
</script>

<style lang="scss" module>
    @import "../../css/element.scss";
    .slider {
        margin-top: 120px;
        img {
            /*设置图片宽度为100%，不然dpr=3时，图片没有通栏*/
            width: 100%;
        }
    }
    .list {
        @include list(row);
        background-color: #fff;
        padding: 40px 0 20px;
        justify-content: space-around;
        a {
            text-decoration: none;
        }
        .item {
            text-align: center;
            img {
                display: inline-block;
                width: 90px;
                height: 90px;
            }
        }
        h4 {
            font-size: 26px;
            margin-top: 12px;
            color: #666;
        }
    }
</style>
