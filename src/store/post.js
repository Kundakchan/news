import firebase from 'firebase/app'

export default {
  state: {
    posts: []
  },
  mutations: {
    setPost: (state, payload) => {
      state.posts.push(payload)
    },
    clearPost: (state) => {
      state.posts = []
    }
  },
  actions: {
    async POST ({ commit, getters }, payload) {
      commit('setProcessing', true)
      commit('clearError')
      try {
        const newPost = {
          title: payload.title,
          discription: payload.discription,
          content: payload.content,
          author: getters.getUser,
          date: new Date().toJSON()
        }
        await firebase.database().ref('news').push(newPost)
        commit('setPost', newPost)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setProcessing', false)
      }
    },
    async SHOW_POST ({ commit }) {
      commit('setProcessing', true)
      commit('clearPost')
      commit('clearError')
      try {
        const post = await firebase.database().ref('news').once('value')
        const posts = post.val()
        Object.keys(posts).forEach(key => {
          let t = posts[key]
          let date = new Date(Date.parse(t.date))
          commit('setPost', {
            title: t.title,
            discription: t.discription,
            content: t.content,
            author: t.author,
            date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`,
            key: key
          })
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setProcessing', false)
      }
    }
  },
  getters: {
    getPost: (state, getters) => {
      return state.posts.filter(item => {
        return item.author === getters.getUser
      })
    }
  }
}
