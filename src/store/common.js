export default {
  state: {
    processing: false,
    error: null
  },
  mutations: {
    setProcessing: (store, payload) => {
      store.processing = payload
    },
    setError: (store, payload) => {
      store.error = payload
    },
    clearError: (store) => {
      store.error = null
    }
  },
  actions: {
    PROCESSING ({ commit }, payload) {
      commit('setProcessing', payload)
    },
    ERROR ({ commit }, payload) {
      commit('setError', payload)
    },
    CLEAR_ERROR ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    getProcessing: state => state.processing,
    getError: state => state.error
  }
}
