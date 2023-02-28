import { defineStore } from 'pinia';

export default defineStore('cartList', {
  state: () => ({ cartItems: [], cartTotal: null }),
  getters: {},
  actions: {
    async getCartList() {
      const customerUrl =
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/carts';
      try {
        const res = await fetch(customerUrl);
        const data = await res.json();
        this.cartItems = data.carts;
        this.cartTotal = data.finalTotal;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
