import Vue from 'vue'
import Vuex from 'vuex'

import common from './store/common'
import user from './store/user'
import post from './store/post'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    post
  }
})
