# vue-cache

## Vue 页面缓存策略

### 业务场景

1. 从列表页进详情页，缓存列表页，当返回列表页，重新拉取数据；

   <img src="D:\myWeb\Vue_demo\vue-cache\public\列表缓存.gif" alt="列表缓存" style="zoom:50%;" />

2. 菜单切换，缓存访问过的页面

   ![菜单页面缓存](D:\myWeb\Vue_demo\vue-cache\public\菜单页面缓存.gif)

   <img src="http://wiki.aihuoshi.net/download/attachments/45777482/%E5%88%97%E8%A1%A8%E7%BC%93%E5%AD%98.gif?version=1&modificationDate=1611560372000&api=v2" alt="列表缓存" style="zoom:50%;" />

2. 同级路由切换缓存

   > 菜单切换，缓存访问过的页面
   
   ![菜单页面缓存](http://wiki.aihuoshi.net/download/attachments/45777482/%E8%8F%9C%E5%8D%95%E9%A1%B5%E9%9D%A2%E7%BC%93%E5%AD%98.gif?version=1&modificationDate=1611560383000&api=v2)
>>>>>>> 48ed76c1af29848cbc9054a735905517cc57ba65

### 思路

1. 在布局组件的  `router-view`  外层包裹  `keep-alive`  抽象组件，利用  `keep-alive`  的属性  `includes` ，通过**组件名**匹配需要缓存的组件实例

   ```vue
   <keep-alive :includes="['compName1', 'compName2', ...]">
   	<router-view />
   </keep-alive>
   ```
   
2. 通过 `keep-alive` 的 `include` 属性配合**命名路由**、**组件名**来匹配，实现动态指定页面缓存。
	> 通过路由表配置 配合 Vuex

   2.1 route表配置

   ```js
   -- router.js
   const routes = [
        {
          path: "/",
          component: Layout,
          redirect: '/page1',
          children: [
            {
              name: "page1", // 保持和对应组件名一样，作为includes缓存匹配
              path: 'page1',
              component: () => import("@/views/page1")
            },
          ],
        }
    ]
   ```
   
   2.2  Vue Store
   
   ```js
   const store = new Vuex.Store({
     state: {
       cacheViews: [] // 保存需要缓存的组件名
     },
     getters: {
       cacheViews: state => state.cacheViews
     },
     mutations: {
       ADD_CACHE_VIEW: (state, compName) => {
         if (state.cacheViews.includes(compName)) return
         state.cacheViews.push(compName)
       },
       DEL_CACHE_VIEW: (state, compName) => {
         const index = state.cacheViews.indexOf(compName)
         index > -1 && state.cacheViews.splice(index, 1)
       }
     }
   })
   ```

### 代码实现

#### 业务场景一

> **从列表页进详情页，缓存列表页，当返回列表页，重新拉取数据。**

1. 在路由表 **meta** 里面添加选项参数  `cache`  , 并且命名路由 **name** 保持和对应 **组件名 **一致。

   ```js
   -- router.js
   const routes = [
     {
       path: "/",
       component: Layout,
       redirect: '/page1',
       children: [
         {
           name: "page2",
           path: 'page2',
           component: () => import("@/views/page2"), // router-view
           redirect: '/page2/pageList',
           children: [
             {
               name: "pageList", // 保持和对应组件名一样，作为includes缓存匹配
               path: 'pageList',
               component: () => import("@/views/page2/pageList"),
               meta: { cache: true, activeMenu: 'page2' },
             },
             {
               name: "pageDetail",
               path: 'pageDetail',
               component: () => import("@/views/page2/pageDetail"),
               meta: { activeMenu: 'page2' },
             },
           ],
         },
       ],
     }
   ]
   ```

2. 全局监听路由切换，判断路由是否需要缓存。这里我是在布局组件 `layout.vue` 做判断，也可以在全局路由守卫里面去做。

   ```vue
   <template>
     <div class="layout">
        <router-view></router-view>
     </div>
   </template>
   <script>
   import { mapGetters } from 'vuex'
   export default {
     name: 'layout',
     computed: {
       ...mapGetters(['cacheViews']),
     },
     watch: {
       $route: {
         handler(to, from) {
          // 路由切换时，判断将要跳转的页面是否需要缓存   
           if (to.name && to.meta.cache) {
             this.$store.commit('ADD_CACHE_VIEW', to.name)
           }
         },
         immediate: true
       }
     }
   }
   </script>
   ```

3. 因为 列表页 `pageList` 是嵌套路由，所以缓存匹配是在列表页对应的  `router-view`  层级去做。

   ```vue
   <template>
     <div class="page2">
       <keep-alive :include="cacheViews">
         <router-view></router-view>
       </keep-alive>
     </div>
   </template>
   
   <script>
   import { mapGetters } from 'vuex'
   export default {
     name: 'page2',
     computed: {
       ...mapGetters(['cacheViews']),
     }
   }
   </script>
   ```

以上就可以实现列表页的缓存了。

当从详情页返回列表需要重新拉取数据，我们可以将请求数据的逻辑放在生命周期钩子 `activated`  里面。

```vue
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'pageList',
  created() {},
  mounted() {},
  activated() {
    // 在这里做异步数据的请求
    this.getListData()
  },
}
</script>
```

#### 业务场景二

> **同级路由切换缓存：菜单切换，缓存访问过的页面**

1. 在路由表将需要缓存的页面，配置 `cache: true`，这里配置 `page1`、`page2` 缓存。

```js
-- router.js
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: '/page1',
    children: [
      {
        name: "page1",
        path: 'page1',
        component: () => import("@/views/page1"),
        meta: { cache: true },
      },
      {
        name: "page2",
        path: 'page2',
        component: () => import("@/views/page2"),
        redirect: '/page2/pageList',
        meta: { cache: true },
        children: [
          {
            name: "pageList", // 保持和对应组件名一样，作为includes缓存匹配
            path: 'pageList',
            component: () => import("@/views/page2/pageList"),
            meta: { cache: true, activeMenu: 'page2' },
          },
          {
            name: "pageDetail",
            path: 'pageDetail',
            component: () => import("@/views/page2/pageDetail"),
            meta: { activeMenu: 'page2' },
          },
        ],
      },
    ],
  }
]
```

2. 因为 `page1` 和 `page2` 同属于一个层级（layout组件的 `router-view`），所以这里需要在 `layout.vue` 组件里面做缓存匹配。

   这里需要注意的是：在watch $route, 所以我们如果用之前的写法去判断，就会导致 `page2` 无法缓存下来，这是因为 `page2` 存在嵌套路由，当我们切换到 `page2`，路由重定向到它的子路由 `pageList`，所以导致判断的 `pageList` 的缓存。

   ```vue
   <script>
   export default {
     name: 'layout',
     watch: {
       $route: {
         handler(to, from) {
           if (to.name && to.meta.cache) {
             this.$store.commit('ADD_CACHE_VIEW', to.name)
           }
         },
         immediate: true
       }
     }
   }
   </script>
   ```

   因此我们改成去拿路由对象的 **matched** 属性（里面包含当前路由的所有嵌套路径片段的 **路由记录**），这样我们就能把`page2`也缓存下来。

   ![b7f92f1dde7ccda6c8bb3ec26e3df4a](D:\myWeb\Vue_demo\vue-cache\public\route_match.png)

```vue
<div class="layout">
  <keep-alive :include="cacheViews">
    <router-view ></router-view>
  </keep-alive>
</div>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters(['cacheViews']),
  },
  watch: {
    $route: {
      handler(to, from) {
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
```

### 最后

通过组件路由钩子 `beforeRouteLeave`，根据具体的需求逻辑去维护 `Vuex` 里面的 `cacheViews`。

例如：我们只需要在列表页跳转详情的时候去缓存列表页，那么就需要在列表组件跟详情组件里面去做判断。

```vue
-- pageList.vue
<script>
  export default {
    name: 'pageList',
    beforeRouteLeave(to, from, next) {
      if (to.name != 'pageDetail') {
        this.$store.commit('DEL_CACHE_VIEW', from.name)
      }
      next()
    }
  }
</script>
```

```vue
-- pageDetail.vue
<script>
  export default {
    name: 'pageDetail',
    beforeRouteLeave(to, from, next) {
      if (to.name != 'pageList') {
        this.$store.commit('DEL_CACHE_VIEW', from.name)
      }
      next()
    }
  }
</script>
```
