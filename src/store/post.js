export default {
  state: {
    posts: []
  },
  mutations: {
    setPost: (state, payload) => {
      state.posts.push(payload)
    }
  },
  actions: {
    POST ({ commit }, payload) {
      commit('setPost', payload)
    }
  },
  getters: {
    getPost: state => state.posts
  }
}
