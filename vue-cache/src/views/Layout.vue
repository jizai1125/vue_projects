<template>
  <div id="app" class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="page1" to="/page1">
            <Icon type="search"></Icon>
            <span>page 1</span>
          </MenuItem>
          <MenuItem name="page2" to="/page2">
            <Icon type="settings"></Icon>
            <span>page 2</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{ padding: '0 16px 16px' }">
          <Breadcrumb :style="{ margin: '16px 0' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card style="height: calc(100% - 53px)">
            <keep-alive :include="cacheViews">
              <router-view ></router-view>
            </keep-alive>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {
    ...mapGetters(['cacheViews']),
    activeName() {
      return this.$route.meta.activeMenu || this.$route.name
    },
    menuitemClasses: function() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log('to', to)
        console.log('from', from)
        const matched = to.matched
        matched.forEach(item => {
          if(item.meta.cache) {
            this.$store.commit('ADD_CACHE_VIEW', item.name)
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<style lang="less">
.ivu-card-body {
  height: 100%;
}
</style>