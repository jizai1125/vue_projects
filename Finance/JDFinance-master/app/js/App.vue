<template>
    <div id="app">
        <router-view/>
        <Navbar/>
    </div>
</template>

<script>
import Navbar from "./public/navbar.vue"

export default {
    name: "App",
    components: {
        Navbar,
    },
}
</script>
