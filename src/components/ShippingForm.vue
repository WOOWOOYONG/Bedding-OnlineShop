<template>
  <div>
    <h2 class="text-2xl text-center pt-5">填寫預訂資料</h2>
    <form class="mt-5" @submit.prevent="handleSubmit">
      <div class="flex flex-col max-w-[20%] mx-auto">
        <label for="name" class="text-left">姓名</label>
        <input
          type="text"
          placeholder="請輸入姓名"
          class="border-2 my-2 py-2 indent-1"
          name="customerName"
          required
          v-model="customer.name"
        />
      </div>
      <div class="flex flex-col max-w-[20%] mx-auto">
        <label for="phone" class="text-left">電話</label>
        <input
          type="text"
          placeholder="請輸入電話"
          class="border-2 my-2 py-2 indent-1"
          name="customerPhone"
          required
          v-model="customer.phone"
        />
      </div>
      <div class="flex flex-col max-w-[20%] mx-auto">
        <label for="email" class="text-left">Email</label>
        <input
          type="mail"
          placeholder="請輸入Email"
          class="border-2 my-2 py-2 indent-1"
          name="customerEmail"
          required
          v-model="customer.email"
        />
      </div>
      <div class="flex flex-col max-w-[20%] mx-auto">
        <label for="address" class="text-left">寄送地址</label>
        <input
          type="text"
          placeholder="請輸入寄送地址"
          class="border-2 my-2 py-2 indent-1"
          name="customerAddress"
          required
          v-model="customer.address"
        />
      </div>
      <div class="flex flex-col max-w-[20%] mx-auto">
        <label for="tradeWay" class="text-left">交易方式</label>
        <select class="border-2 my-2 py-2" v-model="customer.payment">
          <option value="ATM">ATM</option>
          <option value="信用卡">信用卡</option>
          <option value="超商付款">超商付款</option>
        </select>
      </div>
      <div class="max-w-[20%] mx-auto text-left my-2">
        <input
          type="checkbox"
          class="cursor-pointer"
          required
          v-model="customer.accept"
        />
        <p class="inline-block ml-5">已閱讀並同意本站購物條款</p>
      </div>
      <button type="submit" class="my-3 bg-orange-100 py-2 px-3">
        送出預定資料
      </button>
    </form>
  </div>
</template>
<script>
export default {
  props: ['orderUrl'],
  data() {
    return {
      customer: {
        name: '',
        email: '',
        phone: '',
        address: '',
        payment: 'ATM',
        accept: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.customer.name === '' &&
        this.customer.phone === '' &&
        this.customer.email === '' &&
        this.customer.address === ''
      ) {
        alert('請填寫正確資料');
        return;
      } else if (this.customer.accept === false) {
        alert('需先同意本站條款才可購買');
        return;
      } else {
        this.createOrder();
      }
    },
    async createOrder() {
      const orderInfo = {
        data: {
          user: {
            name: this.customer.name,
            tel: this.customer.phone,
            email: this.customer.email,
            address: this.customer.address,
            payment: this.customer.payment,
          },
        },
      };
      try {
        const res = await fetch(this.orderUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderInfo),
        });
        const data = await res.json();
        console.log(data);
        if (data.status) {
          this.customer.name = '';
          this.customer.email = '';
          this.customer.phone = '';
          this.customer.address = '';
          this.customer.payment = 'ATM';
          this.customer.accept = false;
        } else {
          console.error('訂單提交失敗');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
