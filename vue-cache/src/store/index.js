import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cacheViews: []
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
  },
  actions: {},
  modules: {}
})
