<template>
  <div class="shop-cart">
    <!-- 1. 导航  -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 2. 商品列表  -->
    <shop-cart-list></shop-cart-list>

    <!-- 3. 底部汇总  -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import ShopCartList from "./childComps/ShopCartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex';

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      ShopCartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(({
        length: 'cartLength',
        list: 'cartList'
      }))
    }
  }
</script>

<style scoped>
   .shop-cart {
     height: 100vh;
   }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
