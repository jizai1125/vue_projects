<template>
    <Panel title="新手特权" :class="$style.novicePanel">
        <section :class="$style.content">
            <div :class="$style.item">
                <h4>下载APP<span :class="$style.red">送888礼包</span></h4>
                <p>新手专享</p>
                <img src="https://img12.360buyimg.com/jrpmobile/jfs/t5590/252/875247023/17343/946aa72c/59224650N0f7ffc92.png?width=132&height=132" alt="">
            </div>
            <div :class="$style.item">
                <ul>
                    <li>
                        <img src="https://img12.360buyimg.com/jrpmobile/jfs/t5590/252/875247023/17343/946aa72c/59224650N0f7ffc92.png?width=132&height=132" alt="">
                        <h4 :class="$style.red">领128元新手法法红包</h4>
                        <p>立即开通</p>
                    </li>
                    <li>
                        <img src="https://img12.360buyimg.com/jrpmobile/jfs/t5488/298/1036263348/12073/b4f4de97/590ac8e8Ne9def22e.png?width=135&height=135" alt="">
                        <h4>打白条<span :class="$style.red">享利息</span></h4>
                        <p>立即开通享豪礼</p>
                    </li>
                </ul>
            </div>
        </section>
    </Panel>
</template>

<script>
import Panel from "../core/panel.vue"
export default {
    name: "Novice",
    components: {
        Panel,
    },
}
</script>

<style lang="scss" module>
    @import "../../css/element.scss";
    .novicePanel {
        .content {
            @include list(row);
            .item {
                width: 50%;
                &:first-child {
                    padding: 32px 20px;
                    box-sizing: border-box;
                    text-align: center;
                    img {
                        width: 140px;
                        height: 140px;
                        margin: 20px auto 0;
                    }
                }
                .red {
                    color: #f04752;
                }
                h4 {
                    font-size: 26px;
                    line-height: 40px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                p {
                    font-size: 24px;
                    color: #999;
                    margin:  24px 0 0;
                }
                ul {
                    width: 100%;
                    padding: 32px 20px 0 0;
                    box-sizing: border-box;
                    li {
                        width: 100%;
                        height: 144px;
                        img {
                            width: 80px;
                            height: 80px;
                            float: right;
                        }
                    }
                }
            }

        }
    }
</style>
