<template>
  <div id="collection">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back2.svg" alt="">
      </div>
      <div slot="center">我的收藏</div>
    </nav-bar>

    <div v-if="isEmpty">
      <h2>您的收藏空空如也</h2>
    </div>
    <div v-else>
      <scroll class="content">
        <collection-item v-for="(item, index) in collectList" :item-info="item" :key="index"></collection-item>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CollectionItem from "./CollectionItem";
  import Scroll from "@/components/common/scroll/Scroll";

  import { mapGetters} from 'vuex';
  export default {
    name: "MyCollection",
    components: {
      NavBar,
      CollectionItem,
      Scroll
    },
    data() {
      return {

      }
    },
    created() {

    },
    computed: {
      ...mapGetters(['collectList']),
      isEmpty() {
        return !this.collectList.length
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  #collection {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .back {
    width: 40px;
  }

  .back img{
    margin-top: 15px;
    width: 15px;
    height: 15px;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
