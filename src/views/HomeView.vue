<template>
  <div class="home">
    <ProductList :product-url="productUrl" :customer-url="customerUrl" />
    <CartList :customer-url="customerUrl" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import CartList from '@/components/CartList.vue';
export default {
  name: 'HomeView',
  components: { ProductList, CartList },
  data() {
    return {
      productUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/products',
      customerUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/carts',
    };
  },
};
</script>
