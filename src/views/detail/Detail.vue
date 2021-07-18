<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info  :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :goods-info="recommendInfo"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" @collect="collect"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetailData, getRecommend, Goods, Shop, Param} from "network/detail.js"
  import { debounce } from "@/common/utils";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

  import { mapActions } from 'vuex';

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      DetailRecommendInfo,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetailData(this.iid).then((res) => {
        console.log(res);
        let data = res.result;
        // 获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 保存商品的参数信息
        this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)
        // 保存商品的评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      });

      getRecommend().then((res) => {
        // console.log(res);
        this.recommendInfo = res.data.list;
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      }, 100)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart', 'addCollect']),
      imageLoad() {
        // this.$refs.scroll.refresh()
        console.log('-----');
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      contentScroll(position){
        // 1. 获取y值
        const positionY = -position.y;


        // 2. positionY和标题中的高度进行对比
        // positionY 在 this.themeTopYs[0] 和 this.themeTopYs[1]之间, index = 0
        // positionY 在 this.themeTopYs[1] 和 this.themeTopYs[2]之间, index = 1
        // ....
        let length = this.themeTopYs.length;
        for(let i = 0; i < length -1; i++ ) {
          if((this.currentIndex !== 1) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        // for( let i = 0; i < length; i++) {
        //   if((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // }

        this.listenShowBackTop(position);
      },
      addToCart() {
        // 1. 获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2. 将商品添加到购物车
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)

          //   this.show = true;
          //   this.message = res;
          //   console.log(this.message);
          //   setTimeout(() => {
          //     this.show = false;
          //     this.message = '';
          //   }, 2000)
          // })

          // this.$store.dispatch('addCart', product).then(res => {
          //   console.log(res);
          // })
        })
      },
      collect() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        this.addCollect(product).then(res => {
          this.$toast.show(res, 3000)
          console.log(this.$store.state.collectList);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>
