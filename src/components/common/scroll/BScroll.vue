<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "BScroll",
  data() {
    return {
      bscroll: null
    }
  },
  mounted() {
    this.bscroll = new BScroll('.wrapper',{
      click: true
    })

  }
}
</script>

<style scoped>

</style>
