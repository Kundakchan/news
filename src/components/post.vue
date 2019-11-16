<template>
  <section class="uk-container">
    <article v-for="(item) in post" :key="item.key" class="uk-card uk-card-default uk-margin">
      <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-auto">
            <span uk-icon="icon: user; ratio: 2"></span>
          </div>
          <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom">{{ item.title }}</h3>
            <p class="uk-text-meta uk-margin-remove-top"><time :datetime="item.date">{{ item.date }}</time></p>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <p>{{ item.content }}</p>
      </div>
      <div class="uk-card-footer">
        <a href="#" class="uk-button uk-button-text">Read more</a>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    showPost () {
      this.$store.dispatch('SHOW_POST')
    }
  },
  computed: {
    post () {
      return this.$store.getters.getPost
    }
  },
  created () {
    this.showPost()
  }
}
</script>
