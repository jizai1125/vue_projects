<template>
  <div class="login-page mx-auto p-3 w-330">
    <form method="post" action="http://api.com/test">
    <input type="text" name="name" id="">
    <input type="date" name="datetime" id="">
    <button type="submit">submit</button>
    </form>
    <h5 class="my-4 text-center">登录到ZHIHU</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">手机号</label>
        <validate-input
          type="custom"
          placeholder="请输入手机号"
          :rules="phoneRules"
          v-model="phoneVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import createMessage from '../components/createMessage'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const emailVal = ref(undefined)
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
    const passwordVal = ref(undefined)
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '请输入密码！'
      }
    ]
    const phoneVal = ref(undefined)
    const phoneRules: RulesProp = [{
      type: 'custom',
      message: '请输入正确的手机号',
      validator (val) {
        const phoneReg = /1[3|4|5|6|]\d{9}/
        return phoneReg.test(val)
      }
    }]
    const onFormSubmit = (val: boolean) => {
      console.log(val)
      if (val) {
        createMessage('登录成功！', 'success')
        store.commit('login')
        router.push('/')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      phoneVal,
      phoneRules,
      onFormSubmit
    }
  }
})
</script>
