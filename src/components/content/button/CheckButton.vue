<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/shopcart/tick.svg" alt="" >
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button img{
    border-radius: 50%;
    border: 2px solid #ccc;
    width: 20px;
    height: 20px;
  }

  .check img{
    border-color: red;
    background-color: red;
  }
</style>
