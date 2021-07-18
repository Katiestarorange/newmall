<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in listData" :key="index" @click="itemClick(item)">
      <span class="icon">
        <img :src="item.icon" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      addr: require('@/assets/img/profile/order.svg')
    }
  },
  methods: {
    itemClick(item) {
      if(item.flag) {
        console.log('点击了我的收藏');
        this.$router.push('/my-collection')
      }
    }
  }
}
</script>

<style scoped>
  .list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .list-item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .list-item .icon {
    margin-top: 12px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .icon img {
    width: 18px;
    height: 18px;
  }

  .list-item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }


</style>
