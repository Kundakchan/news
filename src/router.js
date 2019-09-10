import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/home')
    },
    {
      path: '/news/:category',
      name: 'news',
      component: () => import('@/components/news'),
      props: true,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/signin')
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/components/signIn')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/signUp')
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('@/components/writeArticle'),
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/signin')
      }
    }
  ]
})
