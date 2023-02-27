<template>
  <div class="home">
    <ProductList :product-url="productUrl" :customer-url="customerUrl" />
    <CartList :customer-url="customerUrl" />
    <ShippingForm :order-url="orderUrl" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import CartList from '@/components/CartList.vue';
import ShippingForm from '@/components/ShippingForm.vue';
export default {
  name: 'HomeView',
  components: { ProductList, CartList, ShippingForm },
  data() {
    return {
      productUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/products',
      customerUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/carts',
      orderUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/customer/woowooyong/orders',
    };
  },
};
</script>
