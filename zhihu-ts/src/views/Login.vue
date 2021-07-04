<template>
  <div class="login-page mx-auto p-3 w-330">
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
    const onFormSubmit = (val: boolean) => {
      console.log(val)
      if (val) {
        store.commit('login')
        router.push('/')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    }
  }
})
</script>
