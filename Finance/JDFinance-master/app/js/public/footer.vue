<template>
    <section :class="$style.footer">
        <p>Copyright © 2004-2018 京东JD.com 版权所有</p>
        <p>
            <router-link to="home">投资有风险，购买需谨慎</router-link>
        </p>
        <p>
            <router-link to="home">京东金融平台服务协议</router-link>
        </p>
        <p>
            <router-link to="home">京东金融隐私政策</router-link>
        </p>
    </section>
</template>

<script>
export default {
    name: "Footer",
}
</script>

<style lang="scss" module>
    .footer {
        margin-bottom: 100px;
        p {
            height: 80px;
            width: 100%;
            line-height: 80px;
            text-align: center;
            font-size: 22px;
            color: #999;
            border-top: 1px solid #999;
            a {
                text-decoration: none;
                color: #999;
            }
        }
    }
</style>
