# zhihu-ts

## day01

- ColumnList.vue

## day02

- Header.vue

- DropDown.vue

  第一种方案：选项通过 **items** prop 传入，内部循环渲染

  ```vue
  <dropdown :title="title" :items="items"></dropdown>
  <script>
      const items = [
          {text: 'option one'},
          ...
      ]
  </script>
  ```

- Dropdown.vue、DropdownItem.vue

  第二种方案：选项抽取为 DropdownItem 独立组件，好处：1. 更具语义化；2. 可以为选项组件添加更多的自定义配置，丰富选项。

  ```vue
  <dropdown :title="title">
      <dropdown-item disabled>option one</dropdown-item>
      ...
  </dropdown>
  ```

- hooks：useClickOutside.ts

  判断点击的位置是否在指定元素内

## day03

- 表单输入组件 ValidateInput.vue

  > v-model原理、$attrs、inheritAttrs

## day04

- 表单 Form

<img src="https://i.loli.net/2021/07/01/hg5pRfBHzwkAPCJ.png" alt="image-20210701112548206" style="zoom: 50%;" />

- validateForm.vue 组件 跟 validateInput.vue 组件 通信

  vue2 中可以用 this.$emit、this.$on、this.$off 实现父子事件通信

  vue3 删除了 this.$on、this.$off 方法，可以借助外部库 例如 [mitt](https://github.com/developit/mitt) 或 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)

## day05

- 表单 Form

  validateInput 通过 mitt 触发一个 form-item-created 事件，传递验证函数，

  validate-form 监听 form-item-created 事件，将每个表单项的验证函数收集起来，在点击提交按钮时，执行每个验证函数，将每个验证函数的结果合并起来（只要有一个为 false，则返回 false），作为 form-submit 事件的 payload。

- vue-router

  ```ts
  import { createRouter, createWebHistory } = 'vue-router'
  const router = createRouter({
      history: createWebHistory(),
      routes: []
  })
  ```

  

  

- vuex

  通过给 createStore 传入泛型 GlobalDataProp 来更好的类型提示

  ```ts
  import { createStore } = 'vuex'
  interface UserProp = {
      isLogin: boolean
      name?: string,
      id?: number
  }
  interface GlobalDataProp = {
      user: userProp
  }
  const store = createStore<GlobalDataProp>({
      state: {
          user: {isLogin: false}
      }
  })
  ```

## day06

