<template>
  <el-row class="tac">
    <el-col :span="4" class="sideBar">
      <el-menu
        router
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item :index="menu.path" v-for="menu in menus" :key="menu.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="mainContainer">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem, Col, Row } from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(MenuItem);
Vue.use(Menu);
export default {
  computed: {
    activeMenu() {
      const { path } = this.$route;
      console.log(path);
      return path
    }
  },
  data() {
    return {
      menus: [
        {
          name: "热门推荐",
          path: "/recommend/hot"
        },
        {
          name: "作者推荐",
          path: "/recommend/author"
        },
        {
          name: "相关内容推荐",
          path: "/recommend/about"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.tac {
  height: calc(100vh - 62.65px);
}
.el-col {
  height: 100%;
}
.sideBar {
  background-color: #e6eeef;
}
.mainContainer {
}
.el-menu {
  background-color: #e6eeef;
}
</style>