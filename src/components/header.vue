<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav">
        <li v-for="(item, index) in links" :key="index">
          <router-link :to="item.path">{{ item.name }}</router-link>
          <div v-if="item.categoris" class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li v-for="(i, index) in item.categoris" :key="index">
                <router-link :to="i.path">{{ i.name }}</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="uk-navbar-right">
      <div class="uk-navbar-item">
        <button v-if="checkUser" @click="onLogOut" class="uk-button uk-button-default">ВЫЙТИ</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onLogOut () {
      this.$store.dispatch('LOG_OUT')
      this.$router.push('/')
    }
  },
  computed: {
    links () {
      if (this.$store.getters.getUser) {
        return [
          {
            name: 'главная'.toUpperCase(),
            path: '/'
          },
          {
            name: 'написать статью'.toUpperCase(),
            path: '/write'
          },
          {
            name: 'НОВОСТИ',
            path: '#',
            categoris: [
              {
                name: 'бизнес'.toUpperCase(),
                path: '/news/business'
              },
              {
                name: 'развлечения'.toUpperCase(),
                path: '/news/entertainment'
              },
              {
                name: 'главный'.toUpperCase(),
                path: '/news/general'
              },
              {
                name: 'здоровье'.toUpperCase(),
                path: '/news/health'
              },
              {
                name: 'наука'.toUpperCase(),
                path: '/news/science'
              },
              {
                name: 'спорт'.toUpperCase(),
                path: '/news/sports'
              },
              {
                name: 'технология'.toUpperCase(),
                path: '/news/technology'
              }
            ]
          }
        ]
      } else {
        return [
          {
            name: 'главная'.toUpperCase(),
            path: '/'
          },
          {
            name: 'Авторизация'.toUpperCase(),
            path: '/signin'
          }, {
            name: 'регистрация'.toUpperCase(),
            path: '/signup'
          }
        ]
      }
    },
    checkUser () {
      return this.$store.getters.checkUser
    }
  }
}
</script>
