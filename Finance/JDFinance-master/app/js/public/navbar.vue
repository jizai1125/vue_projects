<template>
    <section class="navbar">
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="home">
                <img slot="icon" src="//img12.360buyimg.com/jrpmobile/jfs/t1/8325/8/4331/3095/5bda5c89E1be47c14/47b6a296683a12a5.png?width=90&height=90">
                首页
            </mt-tab-item>
            <mt-tab-item id="finance">
                <img slot="icon" src="//img12.360buyimg.com/jrpmobile/jfs/t1/1890/15/14183/1269/5bda5c97E34734b01/241a0f5b17fd3e51.png?width=60&height=60">
                理财
            </mt-tab-item>
            <mt-tab-item id="loan">
                <img slot="icon" src="//img12.360buyimg.com/jrpmobile/jfs/t1/5291/40/14133/594/5bda5ca3E92d0e800/09ac81fa5a5c96ef.png?width=60&height=60">
                白条
            </mt-tab-item>
            <mt-tab-item id="raise">
                <img slot="icon" src="//img12.360buyimg.com/jrpmobile/jfs/t1/3358/38/14064/816/5bda5cabEcb7eca8b/9bb064f1cda7ceba.png?width=60&height=60">
                众筹
            </mt-tab-item>
            <mt-tab-item id="my">
                <img slot="icon" src="//img12.360buyimg.com/jrpmobile/jfs/t1/7491/15/4277/926/5bda5cb9E421a0e60/89ee14ce9daf4aab.png?width=60&height=60">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </section>
</template>

<script>
import { Tabbar, TabItem } from "mint-ui"

export default {
    name: "Navbar",
    components: {
        "mt-tabbar": Tabbar,
        "mt-tab-item": TabItem,
    },
    data() {
        return {
            selected: "home",
        }
    },
    updated() {
        this.$router.push({ name: `${this.selected}` })
    },
}
</script>

<style lang="scss">
    @import '~mint-ui/lib/style.css';
    .navbar {
        .mint-tabbar {
            height: 100px;
            .mint-tab-item {
                .mint-tab-item-icon {
                    height: 50px;
                    width: 50px;
                }
                .mint-tab-item-label {
                    height: 50px;
                    line-height: 30px;
                    font-size: 20px;
                }
            }
        }
    }
</style>
