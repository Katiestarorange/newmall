<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="goodsInfo" class="info-goods"></goods-list>
  </div>
</template>

<script>
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: "DetailRecommendInfo",
    components: {
      GoodsList
    },
    props: {
      goodsInfo: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .info-header {
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
  }

  .info-goods {
    padding: 8px;
  }
</style>
