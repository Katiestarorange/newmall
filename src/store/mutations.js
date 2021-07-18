import {ADD_COUNTER, ADD_TO_CART, MOVE_OFF_COLLECT, ADD_TO_COLLECT} from './mutition-types'

export default  {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [MOVE_OFF_COLLECT](state, payload) {
    payload.isCollect = false;
    state.collectList.pop();
  },
  [ADD_TO_COLLECT](state, payload) {
    state.collectList.push(payload);
  }
}
