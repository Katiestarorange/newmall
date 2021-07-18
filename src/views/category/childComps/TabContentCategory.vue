<template>
  <div>
      <div class="list">
        <div v-for="(item, index) in subcategory.list" :key="index" class="item">
          <a :href="item.link">
            <img class="item-img" :src="item.image" alt="">
            <div class="item-text">{{item.title}}</div>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
  import GridView from "@/components/common/gridView/GridView";
  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategory: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .list {
    position: relative;
    margin-left: 7px;
    padding: 8px 2px;
    width: 220px;
    text-align: center;
    font-size: 12px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    width: 70px;
    padding: 0 4px;
  }
  .item-img {
    margin-top: 20px;
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
