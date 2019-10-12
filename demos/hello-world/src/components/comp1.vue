<template>
    <div>
        <h1>component 1</h1>
            <ul>
                <li :style="`font-size: ${size}px;`" @click="size++"><a href="#">11</a></li>
                <li :style="`font-size: ${size}px;`" @click="size++"><a href="#">22</a></li>
            </ul>
    </div>
</template>

<script>
    export default {
        name: "comp1",
        data() {
            return {
                size: 12,
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>