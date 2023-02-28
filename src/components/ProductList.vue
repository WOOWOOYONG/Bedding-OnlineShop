<template>
  <div>
    <h1 class="text-3xl text-indigo-700 text-center my-5 mx-auto">床具選購</h1>
    <div class="mx-auto max-w-[60%]">
      <ul class="grid sm:grid-cols md:grid-cols-4 gap-10 px-20">
        <li class="col-span-1" v-for="product in products" :key="product.id">
          <h3 class="font-medium text-center mb-3">{{ product.title }}</h3>
          <img :src="product.images" alt="product-pic" class="w-full" />
          <div class="my-3">
            <span class="mx-2">原價{{ product.origin_price }}</span>
            <span class="mx-2 font-bold">特價{{ product.price }}</span>
          </div>
          <div class="">
            <div>
              <span class="mr-2">數量</span>
              <select :class="'num' + product.id">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>

            <button
              :data-id="product.id"
              @click="addToCart"
              class="mt-2 w-full py-2 border-2 hover:bg-gray-100"
            >
              加入購物車
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['productUrl', 'customerUrl'],
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getProductList() {
      try {
        const res = await fetch(this.productUrl);
        const data = await res.json();
        this.products = data.products;
        console.log(this.products);
      } catch (err) {
        console.log(err);
      }
    },
    async addToCart(e) {
      const id = e.target.dataset.id;
      const num = document.querySelector(`.num${id}`).value;
      const product = {
        data: {
          productId: id,
          quantity: parseInt(num),
        },
      };
      try {
        const res = await fetch(this.customerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getProductList();
  },
};
</script>
<style></style>
