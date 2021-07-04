<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">ZHIHU</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好${user.name}`">
          <dropdown-item class="dropdown-item">option a</dropdown-item>
          <dropdown-item class="dropdown-item" disabled>option b</dropdown-item>
          <dropdown-item class="dropdown-item">option c</dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { PropType } from 'vue'
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default {
  name: 'Header',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props, context) {
    return {}
  }
}
</script>

<style scoped>
</style>
