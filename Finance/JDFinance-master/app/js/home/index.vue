<template lang="html">
    <div >
        <Heador/>
        <Slider/>
        <Novice/>
        <Loan/>
        <Finance/>
        <Product/>
        <Footor/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Footor from "../public/footer.vue"
import Slider from "./slider_home.vue"
import Novice from "./novice.vue"
import Loan from "./loan.vue"
import Finance from "./finance.vue"
import Product from "./product.vue"

export default {
    components: {
        Heador,
        Slider,
        Novice,
        Loan,
        Finance,
        Product,
        Footor,
    },
}
</script>

<style lang="scss" module>

</style>
