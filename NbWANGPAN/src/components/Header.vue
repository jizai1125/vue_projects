<template>
  <div class="header">
    <div class="header__title">
      <img class="header__icon" src="../assets/logo.png" />
      <span>NB资源下载</span>
    </div>
    <div
      class="header__title route-item"
      :class="{active: currentIndex === idx}"
      @click="currentIndex = idx"
      v-for="(route, idx) in routes"
      :key="route.path"
    >
      <router-link :to="route.path">{{route.name}}</router-link>
    </div>
    <div v-if="hasAuth" class="header__user">
      <el-dropdown @command="handleUser">
        <span class="el-dropdown-link">
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout" icon="el-icon-setting">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dropdown, DropdownMenu, DropdownItem, Message } from "element-ui";
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  name: "Header",
  props: {},
  computed: {
    hasAuth: function() {
      return this.$store.state.token;
    },
    userName: function() {
      return this.$store.state.userName;
    }
  },
  data() {
    return {
      currentIndex: 0,
      routes: [
        {
          name: "我的云盘",
          path: "/cloud"
        },
        {
          name: "资源推荐",
          path: "/recommend"
        }
      ]
    };
  },
  created() {
    const { path } = this.$route;
    this.currentIndex = this.routes.findIndex(item => item.path === path);
  },
  methods: {
    handleUser(item) {
      if (item === "logout") {
        Message({
          message: "注销成功",
          type: "success",
          center: true
        });
        this.$store.dispatch("UserLogout");
        this.$router.push("/");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header {
  padding: 20px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
}

.header__title {
  display: inline-block;
}
.route-item {
  margin-left: 20px;
}
.route-item.active a {
  color: #409eff;
}

.header__icon {
  height: 20px;
  vertical-align: middle;
}

.header__user {
  float: right;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>