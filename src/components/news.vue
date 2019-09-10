<template>
  <div class="uk-container news-list">
    <transition-group appear name="fade">
      <div class="uk-margin" v-for="(item) in news" :key="item.title">
        <div class="uk-card uk-card-default uk-card-body">
          <article class="uk-article">
            <h3 class="uk-article-title">{{ item.title }}</h3>
            <img :data-src="item.urlToImage" alt="img" uk-img>
            <p class="uk-article-meta"><span class="uk-margin-small-left">{{ times(item.publishedAt) }}</span> <span class="uk-label uk-margin-small-left">{{ item.source.name }}</span></p>
            <p class="uk-text-large">{{ item.description }}</p>
            <a :href="item.url" class="uk-button uk-button-primary" target="_blank">Подробнее</a>
          </article>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: [
    'category'
  ],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    api () {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.list(data.articles)
          this.times(data.articles[0].publishedAt)
          console.log(data)
        })
    },
    list (data) {
      let i = 0
      let timerId = setInterval(() => {
        this.articles.push(data[i])
        i++
        if (i >= data.length) clearTimeout(timerId)
      }, 500)
    },
    times (time) {
      let tis = Date.parse(time)
      let date = new Date(tis)
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`
    }
  },
  computed: {
    url () {
      return 'https://newsapi.org/v2/top-headlines?category=' + this.category + '&country=ru&pageSize=10&page=1&apiKey=3a0281b49b9f4b48847bf83f2d4ec340'
    },
    news () {
      return this.articles
    }
  },
  created () {
    this.api()
  },
  mounted () {
    const news = document.querySelector('html')
    news.addEventListener('scroll', (e) => {
      let wrapper = e.target
      console.log(wrapper)
    })
  },
  watch: {
    '$route' (to, from) {
      this.api()
      this.articles = []
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all .3s ease;
}
.fade-enter {
  transform: translateX(50px);
  opacity: 0;
}
</style>
