<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱</label>
        <validate-input type="text" v-model="emailValue" :rules="emailRules" placeholder="请输入邮箱"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input type="password" v-model="password" :rules="passwordRules" placeholder="请输入密码"></validate-input>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-danger">Submit</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/Header.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

const mockListData = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar:
    //   'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

const user: UserProps = {
  isLogin: true,
  id: 1,
  name: 'jizai'
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const list: ColumnProps[] = mockListData
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '请输入电子邮箱！'
      },
      {
        type: 'email',
        message: '邮箱格式不正确！'
      }
    ]
    const emailValue = ref(undefined)
    const password = ref(undefined)
    const passwordRules: RulesProp = [{
      type: 'required',
      message: '请输入密码！'
    }]

    const onFormSubmit = (val: boolean) => {
      console.log(val)
    }
    return {
      list,
      user,
      emailValue,
      emailRules,
      password,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
