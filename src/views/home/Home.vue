<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="fixed" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true" @pullingup="loadMore">
      <home-swiper ref="homeSwiper" :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {debounce} from "@/common/utils";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // result: []
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    console.log('创建home');
    this.getHomeMultidata(),

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    // 重新刷新，获取content的高度，避免图片加载过慢导致的bug
    // const refresh = debounce(this.$refs.scroll.refresh, 300)
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh()
    // })
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    console.log('activated' + this.saveY);
    // this.$refs.homeSwiper.startTimer()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log('deactivated' + this.saveY);
    // this.$refs.homeSwiper.stopTimer()

    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    // 事件监听相关方法
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      if(this.$refs.tabControl1 !== undefined) {
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }
    },
    contentScroll(position){
      this.listenShowBackTop(position);
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },


    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUpp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*position: relative;*/
    height: 100vh;
  }
  .home-nav{
    /*background-color: #ff8198;*/
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .fixed {
    position: fixed;
    background-color: #fff;
    top: 43px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  !*margin-top: 44px;*!*/
  /*}*/
</style>
