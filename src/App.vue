<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      return
    }
    document.documentElement.setAttribute('data-theme', theme)
    document
      .getElementById('theme')
      .setAttribute('href', `${process.env.BASE_URL}theme/${theme}/index.css`)
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1000px;
}
.content {
  box-sizing: border-box;
  /* padding: 0 18px; */
  width: 100%;
  height: 100%;
}
.header_tool {
  @include border-color();
}
.tool_bar {
  @include tool-bar-color();
  line-height: 25px;
  padding: 0 4px;
}
</style>
