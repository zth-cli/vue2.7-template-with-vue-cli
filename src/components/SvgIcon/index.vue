<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="name" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  data() {
    return {
      name: '#icon-' + this.icon,
    }
  },
  props: ['icon'],
}
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
