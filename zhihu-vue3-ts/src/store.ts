import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number,
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
      columnId: 1
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(item => item.id === id)
    },
    getPostsByCid: state => (id: number) => {
      return state.posts.filter(item => item.columnId === id)
    }
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'jizai'
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  actions: {}
})

export default store
