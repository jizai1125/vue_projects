<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post.id}/`">{{
            post.title
          }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img
              :src="post.image"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.content }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../testData'

export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const posts = props.list
    // const posts = computed(() => {
    //   return props.list.map((post) => {
    //     generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
    //     return post
    //   })
    // })
    return {
      posts
    }
  }
})
</script>
