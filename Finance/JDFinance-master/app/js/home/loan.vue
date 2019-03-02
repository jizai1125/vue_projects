<template>
    <Panel title="极速贷款" :class="$style.loanPanel">
        <section :class="$style.content">
            <router-link to="http://github.com/Fighter1125">
                <img src="https://img12.360buyimg.com/jrpmobile/jfs/t1/24958/23/5984/66824/5c466c74Eefe11794/234f78a6487d9130.jpg?width=750&height=200" alt="">
            </router-link>
        </section>
    </Panel>
</template>

<script>
import Panel from "../core/panel.vue"
export default {
    name: "Loan",
    components: {
        Panel,
    },
}
</script>

<style lang="scss" module>
    .loanPanel {
        .content {
            padding: 23px 0;
            a {
                display: inline-block;
                width: 100%;
                border-radius: 80px;
                box-shadow: 0 4px 20px 4px rgba(0,0,0,.4);
                img {
                    border-radius: 60px;
                    width: 100%;
                }
            }
        }
    }
</style>
