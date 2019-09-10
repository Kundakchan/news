<template>
  <div id="app">
    <header>
      <app-header></app-header>
    </header>
    <main class="uk-container uk-container uk-margin-large-top">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: {
    'app-header': appHeader
  }
}
</script>

<style lang="scss">
html {
  overflow-y:scroll;
}
html, body, #app {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
}
</style>
