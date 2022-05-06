import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      user: null
    }
  },
  getters: {
    username: state => state.user?.name
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    getUser({ commit }, data) {
      commit('setUser', data)
    }
  }
});

export default store