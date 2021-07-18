import {ADD_COUNTER, ADD_TO_CART, MOVE_OFF_COLLECT, ADD_TO_COLLECT} from './mutition-types'

export default {
  addCart(context, payload) {
    // 对象解构法：context = {state, commit};
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('商品数量+1');
      }else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功');
      }
    })
  },
  addCollect(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.collectList.find(item => item.iid === payload.iid);
      if(oldProduct) {
        context.commit(MOVE_OFF_COLLECT, payload);
        resolve('取消收藏成功');
      }else {
        payload.isCollect = true;
        context.commit(ADD_TO_COLLECT, payload);
        resolve('收藏成功');
      }
    })
  }
}
