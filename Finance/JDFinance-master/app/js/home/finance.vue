<template>
    <Panel title="理财精选" :class="$style.financePanel">
        <section :class="$style.content">
            <ul>
                <li v-for="item in items" :key="item.title">
                    <router-link :to="item.href">
                        <h4>{{ item.title }}<span :class="$style.tip">{{ item.tip }}</span></h4>
                        <p :class="$style.rate">{{ item.rate }}%</p>
                        <p :class="$style.description">{{ item.des }}</p>
                    </router-link>
                </li>
            </ul>
        </section>
    </Panel>
</template>

<script>
import Panel from "../core/panel.vue"
export default {
    name: "Finance",
    components: {
        Panel,
    },
    data() {
        return {
            items: [
                {
                    href: "http://github.com/Fighter1125",
                    title: "理财精选",
                    tip: "理财首选",
                    rate: 5.6,
                    des: "七日年化收益率",
                },
                {
                    href: "http://github.com/Fighter1125",
                    title: "理财精选",
                    tip: "理财首选",
                    rate: 5.6,
                    des: "七日年化收益率",
                },
                {
                    href: "http://github.com/Fighter1125",
                    title: "理财精选",
                    tip: "理财首选",
                    rate: 5.6,
                    des: "七日年化收益率",
                },
                {
                    href: "http://github.com/Fighter1125",
                    title: "理财精选",
                    tip: "理财首选",
                    rate: 5.6,
                    des: "七日年化收益率",
                },
            ],
        }
    },
}
</script>

<style lang="scss" module>
    @import "../../css/element.scss";
    .financePanel {
        .content {
            padding: 23px 0;
            &:after {
                content: ' ';
                width: 90%;
                border: 0.5px solid #999;
                display: block;
                position: relative;
                top: -220px;
                left: 5%;
            }
            ul {
                @include list(row);
                li {
                    position: relative;
                    a {
                        text-decoration: none;
                        color: #000;
                    }
                    padding: 0 0 60px 40px;
                    width: 50%;
                    box-sizing: border-box;
                    h4 {
                        font-size: 26px;
                        .tip {
                            color: #f04752;
                            border: 1px solid #999;
                            font-size: 18px;
                            margin-left: 10px;
                            border-radius: 8px;
                            vertical-align: top;
                        }
                    }
                    .rate {
                        font-weight: bold;
                        font-size: 48px;
                        line-height: 88px;
                        color: #f04752;
                    }
                    .description  {
                        font-size: 18px;
                        color: #999;
                    }
                    &:nth-child(2n+1):after {
                        content: ' ';
                        display: block;
                        position: absolute;
                        right: 0;
                        top: 0;
                        border: 0.5px solid #999;
                        width: 1px;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
