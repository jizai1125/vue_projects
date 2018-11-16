<template>
    <div>
        <form action="javascript;" class="mui-input-group">
            <div class="mui-input-row mui-search">
                <input type="text" name="search" class="mui-input-clear" placeholder="输入关键词...">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary">搜索</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style scoped>
    .mui-input-group {
        /*width: 400px;*/
        border: 0;
        margin: 6px auto;
    }
</style>