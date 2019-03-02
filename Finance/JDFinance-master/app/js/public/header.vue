<template>
    <div :class="$style.header">
        <span :class="$style.left">
            <router-link to="https://github.com/Fighter1125">登录</router-link>
            &nbsp;|&nbsp;
            <router-link to="https://github.com/Fighter1125">注册</router-link>
        </span>
        <btn :class="$style.btnDownload">APP下载</btn>
    </div>
</template>
32px->0.8rem
100px
<script>
import btn from "../core/btn.vue"
export default {
    name: "Header",
    components: {
        btn
    }
}
</script>

<style lang="scss" module>
    .header {
        color: #666;
        height: 100px;
        line-height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        /* 如若需要原样输出32px，则在后面加上注释/no/ */
        font-size: 32px;
        background: #fff url("//m.jr.jd.com/spe/qyy/main/images/jr-logo.png") center center no-repeat;
        background-size: auto 50%;
        z-index: 100;
        .left {
            font-size: 28px;
            height: 30px;
            line-height: 30px;
            margin: 17px 0 0 18px;
            a {
                text-decoration: none;
                color: #f04752;
            }
        }
        .btnDownload {
            float: right;
            font-size: 24px;
            border-width: 0;
            height: 56px;
            line-height: 56px;
            min-width: 120px;
            padding: 0;
            border-radius: 4px;
            margin: 28px 24px 0 0;
        }
    }
</style>
