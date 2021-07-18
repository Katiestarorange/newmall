<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @itemSelect="itemSelect"></tab-menu>

      <scroll class="tab-content">
        <tab-content-category :subcategory="showSubcategory"></tab-content-category>

        <tab-control class="tab-control" :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>

        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import TabContentDetail from "./childComps/TabContentDetail";

  import {getCategory, getCategoryDetail, getSubcategory} from "@/network/category";
  import {tabControlMixin} from "@/common/mixin";
  import {POP, NEW, SELL} from "@/common/const";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabContentCategory,
      Scroll,
      TabControl,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: [],
        currentIndex: -1
      }
    },
    created() {
      this._getCategory();
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          console.log(res);
          // res.list.title
          this.categories = res.data.category.list;
          for(let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this._getSubcategory(0)
        })
      },
      _getSubcategory(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey;
        getSubcategory(maitKey).then(res => {
          // console.log(res);
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData}
          console.log(this.categoryData[index].subcategories);
          this._getCategoryDetail(POP)
          this._getCategoryDetail(NEW)
          this._getCategoryDetail(SELL)
        })
        // console.log(this.categoryData[index].subcategories);

      },
      _getCategoryDetail(type){
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData}
        })
      },
      itemSelect(index) {
        this._getSubcategory(index);
      }
    }
  }
</script>

<style scoped>
  .category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    text-align: center;
    color: #fff;
    z-index: 9;
  }

  .content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

  .tab-content {
    margin-left: 100px;
    height: 100%;
    flex: 1;
    width: 220px;
  }

  .tab-control {
    width: 220px;
    margin-left: 2px;
  }
</style>
