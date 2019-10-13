### 1. 待办
  - 学习 `vue-lazyload` 源码

### 2. 进度

  - 2019.10.13
  > 4.12

### 3. 问题

>`Better-Scroll` 插件 使用上下滑动功能时，无法滑动
```javascript
原因1： 因为是异步加载数据，必须等到数据请求完时，再进行初始化
原因2： dom结构有问题
      <div class="wrapper">
        <div>  // 需要再套一层div
          <li></li>
          ...
        </div>
      </div>
``` 