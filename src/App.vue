<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    var theme = localStorage.getItem('theme')
    if (!theme) return
    document.documentElement.setAttribute('data-theme', theme)
    document
      .getElementById('theme')
      .setAttribute('href', `${process.env.BASE_URL}theme/${theme}/index.css`)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
