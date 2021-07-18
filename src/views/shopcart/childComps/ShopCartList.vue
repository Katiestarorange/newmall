<template>
  <div class="shop-cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import CartListItem from "@/views/shopcart/childComps/CartListItem";

  import { mapGetters} from 'vuex';
  export default {
    name: "ShopCartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .shop-cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
