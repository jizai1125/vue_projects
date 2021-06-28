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

  



