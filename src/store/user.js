import firebase from 'firebase/app'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    async SIGN_UP ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(payload.user, payload.password)
        commit('setUser', user.user.uid)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setProcessing', false)
      }
    },
    async SIGN_IN ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        commit('setUser', user.user.uid)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setProcessing', false)
      }
    },
    LOGGED_USER ({ commit }, payload) {
      commit('setUser', payload.uid)
    },
    LOG_OUT ({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
        })
    }
  },
  getters: {
    getUser: state => state.user,
    checkUser: state => state.user !== null
  }
}
