<template>
  <section class="uk-container">
    <form @submit.prevent="onSubmit">
      <fieldset class="uk-fieldset">
        <legend class="uk-heading-small">Добавить статью</legend>
        <div class="uk-margin">
          <label for="title" class="uk-form-label">Заголовок статьи</label>
          <input id="title" type="text" class="uk-input" placeholder="Статья первая" v-model="title">
        </div>
        <div class="uk-margin">
          <label for="discription" class="uk-form-label">Описания</label>
          <input id="discription" type="text" class="uk-input" placeholder="Краткое описания статьи" v-model="discription">
        </div>
        <div class="uk-margin">
          <label for="content" class="uk-from-label">Содержимое статьи</label>
          <textarea id="content" class="uk-textarea" placeholder="Подробное описания статьи" v-model="content"></textarea>
        </div>
      </fieldset>
      <div class="uk-margin">
        <button class="uk-button uk-button-default">Добавить</button>
      </div>
    </form>
    <pre>{{ post }}</pre>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      discription: '',
      content: ''
    }
  },
  methods: {
    onSubmit () {
      const post = {
        title: this.title,
        discription: this.discription,
        content: this.content,
        datePost: new Date(),
        author: this.$store.getters.getUser
      }
      this.$store.dispatch('POST', post)
      this.clearForm()
    },
    clearForm () {
      this.title = ''
      this.discription = ''
      this.content = ''
    }
  },
  computed: {
    post () {
      return this.$store.getters.getPost
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
