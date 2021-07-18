<template>
  <div class="profile">
    <nav-bar class="nav-bar"><div slot="center">155商城</div></nav-bar>
    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view class="order-list" :list-data="orderList"></list-view>
    <list-view class="service-list" :list-data="serviceList"></list-view>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";

  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data() {
     return {
       orderList: [
         {icon: require('@/assets/img/profile/order.svg'),  info: '我的消息'},
         {icon: require('@/assets/img/profile/point.svg'), info: '积分商城'},
         {icon: require('@/assets/img/profile/vip.svg'), info: '会员卡'},
       ],
       serviceList: [
         {icon: require('@/assets/img/profile/collect.svg'), info: '我的收藏', flag: true},
         {icon: require('@/assets/img/profile/service.svg'), info: '我的购物车'},
         {icon: require('@/assets/img/profile/download.svg'), info: '下载购物APP'},
       ]
     }
    },
    methods: {
      btnClick() {
        console.log(this.BScroll);
      }
    }
  }
</script>

<style scoped>
  .profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    padding: 18px;
    background-color: #fff;
    text-align: center;
    font-size: 13px;
    color: #666;
  }

  .number .balance{
    font-size: 20px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .number .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
