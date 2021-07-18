<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-item" v-for="(item, index) in categories" :key="index" @click="itemClick(index)" :class="{active: currentIndex === index}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('itemSelect', index);
      }
    }
  }
</script>

<style scoped>
  .tab-menu {
    width: 100px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background-color: #f6f6f6;
  }

  .menu-item {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-item.active {
    background-color: #fff;
    font-weight: 700;
    border-left: 2px solid var(--color-high-text);
    color: var(--color-high-text);
  }
</style>
