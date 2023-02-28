<template>
  <div class="mt-10 bg-gray-50">
    <h1 class="text-2xl text-center pt-5">我的購物車</h1>
    <table class="table-auto mx-auto mt-10">
      <thead>
        <tr class="border-b border-slate-300">
          <th class="text-center p-5">品項</th>
          <th class="text-center p-5">單價</th>
          <th class="text-center p-5">數量</th>
          <th class="text-center p-5">金額</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2" v-for="item in cartItems" :key="item.id">
          <td class="p-5">
            <div class="flex items-center">
              <img
                :src="item.product.images"
                alt="product-image"
                class="w-20"
              />
              <span class="ml-5">{{ item.product.title }}</span>
            </div>
          </td>
          <td class="p-5">{{ item.product.price }}</td>
          <td class="p-5">
            <div class="flex items-center gap-2">
              <span
                :data-id="item.id"
                @click="minusCartItemNum"
                class="cursor-pointer"
              >
                <!-- <i
                  class="fa-solid fa-minus cursor-pointer"
                  :data-id="item.id"
                ></i> -->
                －
              </span>
              <input
                type="number"
                disabled
                class="border-2 text-center w-10"
                min="1"
                max="9"
                :class="'cartNum' + item.id"
                :value="item.quantity"
                :data-id="item.id"
              />
              <span
                @click="plusCartItemNum"
                :data-id="item.id"
                class="cursor-pointer"
              >
                <!-- <i
                  class="fa-solid fa-plus cursor-pointer"
                  :data-id="item.id"
                ></i> -->
                ＋
              </span>
            </div>
          </td>
          <td class="p-5">{{ item.product.price * item.quantity }}</td>
          <td class="p-5">
            <button :data-id="item.id" @click="delCartItem">X</button>
          </td>
        </tr>
        <tr>
          <td class="p-5">
            <button
              class="discardAllBtn w-full bg-orange-100 p-3"
              @click="delAllCartItems"
            >
              刪除所有品項
            </button>
          </td>
          <td class="p-5"></td>
          <td class="p-5"></td>
          <td class="p-5">總金額</td>
          <td class="p-5">{{ cartTotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['customerUrl'],
  data() {
    return {
      cartItems: [],
      cartTotal: null,
    };
  },
  methods: {
    async getCartList() {
      try {
        const res = await fetch(this.customerUrl);
        const data = await res.json();
        this.cartItems = data.carts;
        this.cartTotal = data.finalTotal;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async delAllCartItems() {
      if (this.cartItems.length > 0) {
        let yes = confirm('確定刪除所有品項？');
        if (yes) {
          try {
            const res = await fetch(this.customerUrl, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
            console.log(data.message);
            this.getCartList();
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    async delCartItem(e) {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`${this.customerUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          console.log('刪除成功');
          this.getCartList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    minusCartItemNum(e) {
      const cartId = e.target.dataset.id;
      const quantityInput = document.querySelector(`.cartNum${cartId}`);
      const quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        const updatedQuantity = quantity - 1;
        quantityInput.value = updatedQuantity;
        const updatedItem = {
          data: {
            id: cartId,
            quantity: updatedQuantity,
          },
        };
        this.modifyCartItemNum(updatedItem);
      }
    },
    plusCartItemNum(e) {
      const cartId = e.target.dataset.id;
      const quantityInput = document.querySelector(`.cartNum${cartId}`);
      const quantity = parseInt(quantityInput.value);
      if (quantity < 9) {
        const updatedQuantity = quantity + 1;
        quantityInput.value = updatedQuantity;
        const updatedItem = {
          data: {
            id: cartId,
            quantity: updatedQuantity,
          },
        };
        this.modifyCartItemNum(updatedItem);
      }
    },
    async modifyCartItemNum(cartItem) {
      try {
        const res = await fetch(this.customerUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
        const data = await res.json();
        console.log(data);
        this.getCartList();
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
<style>
i {
  pointer-events: all;
}
</style>
