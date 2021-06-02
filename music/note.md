### 1. 待办
  
  - [x] 学习 `vue-lazyload` 源码
  - 学习 `good-storage` 源码

### 2. Note

  - css3: `animation-play-state` 设置动画状态
  - vue事件： 通过在子元素 `@click.stop` 防止点击子元素事件冒泡到父元素

### 3. 组件

  推荐页 | 歌手页 | 排行页 | 搜索页
  |:--:|:--:|:--:|:--:|
  recommend.vue | singer.vue | rank.vue | search.vue
  disc-info.vue、slider.vue、scroll.vue | singer-info.vue | rank-info.vue | search-list.vue

### 4. 问题

- >`Better-Scroll` 插件 使用上下滑动功能时，无法滑动

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
- > `player.vue` 播放问题
```javascript

问题： 监听`store`的`playing`变化时调用`this.$refs.audio.play()`报错
`Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.`

原因： 此时`src`还没加载完成

解决方法： 等待加载完成再去执行`play()/pause()`方法，利用`$nextTick()`等待`DOM`更新完成再执行
```

- > `progress-bar.vue` 点击问题
```javascript
问题： 两次点击相同位置时， `e.offsetX`不同

原因： 

解决方法： 使用`getBoundingClientRect()`和`e.pageX` 差值来确定点击位置相对于进度条的位置
```

- > 获取音乐音频`url`优化问题
```javascript

问题： 点击歌手时，获取歌曲列表，因为音频`url`需要单独请求拿到`key`,当再构造歌手对象数据时，就得等待异步获取到`key`之后再构造，
造成的问题就是当歌曲过多时，等待的时间过长。

解决方法： 当点击当前歌手下对应歌曲时，再去获取相应的音频`key`构造url
```

- > 播放器组件`player.vue`问题
```javascript
问题： 歌词点击时会切换到cd页，或者点击cd页时会切换到歌词页;手机端测试时滑动有问题

原因： 

解决方法： 
```
- > 播放列表组件`playerlist.vue`问题
```javascript
问题： 排行榜榜单点击歌曲，点击播放列表，删除一些歌曲后，再点击榜单歌曲，然后点击播放列表，scroll滚动有问题

原因： 没有重新渲染，Vue的`VDOM`顺序不一样，因为 `transition-group` 需要绑定了 `key`，使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略

解决方法： 
```