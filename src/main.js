import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/vuelidate'

import configFirebase from './config/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    firebase.initializeApp(configFirebase)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('LOGGED_USER', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
