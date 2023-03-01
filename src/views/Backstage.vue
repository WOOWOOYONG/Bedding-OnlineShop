<template>
  <div class="lg:max-w-[80%] mx-auto">
    <h1 class="text-3xl">訂單明細</h1>
    <h2 v-if="!orders.length">目前沒有訂單</h2>
    <div v-if="orders.length">
      <button
        @click="deleteAllOrder"
        class="mt-5 py-2 px-3 rounded-md bg-amber-200"
      >
        刪除全部訂單
      </button>
      <div class="overflow-auto px-6">
        <table
          class="mx-auto my-10 border-collapse table-auto whitespace-nowrap"
        >
          <thead>
            <tr>
              <th class="p-4 border border-slate-300">訂單編號</th>
              <th class="p-4 border border-slate-300">聯絡人</th>
              <th class="p-4 border border-slate-300">聯絡地址</th>
              <th class="p-4 border border-slate-300">電子郵件</th>
              <th class="p-4 border border-slate-300">訂單品項</th>
              <th class="p-4 border border-slate-300">訂單日期</th>
              <th class="p-4 border border-slate-300">訂單狀態</th>
              <th class="p-4 border border-slate-300">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="p-5 border border-slate-300">
                {{ order.createdAt }}
              </td>
              <td class="p-5 border border-slate-300">
                <p class="font-bold">{{ order.user.name }}</p>
                <p>{{ order.user.tel }}</p>
              </td>
              <td class="p-5 border border-slate-300">
                {{ order.user.address }}
              </td>
              <td class="p-5 border border-slate-300">
                {{ order.user.email }}
              </td>
              <td class="p-5 text-left border border-slate-300">
                <p v-for="product in order.products" :key="product.id">
                  {{ product.title }}
                </p>
              </td>
              <td class="p-5 border border-slate-300">
                {{
                  new Date(order.createdAt * 1000)
                    .toISOString()
                    .slice(0, 10)
                    .replace('T', ' ')
                }}
              </td>
              <td class="p-5 border border-slate-300 bg-">
                <button
                  @click="confirmPayment"
                  :data-id="order.id"
                  class="px-3 py-2 rounded-md text-white"
                  :class="order.paid ? 'bg-gray-500' : 'bg-red-600'"
                >
                  {{ order.paid ? '已付款' : '未處理' }}
                </button>
              </td>
              <td class="p-5 border border-slate-300">
                <button :data-id="order.id" @click="deleteOrder">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Backstage',
  data() {
    return {
      adminUrl:
        'https://livejs-api.hexschool.io/api/livejs/v1/admin/woowooyong/orders',
      token: 'TPZHZLqfSOaqH1KzCtvwfSqAF1g2',
      orders: [],
    };
  },
  methods: {
    async getOrderList() {
      try {
        const res = await fetch(this.adminUrl, {
          headers: {
            Authorization: this.token,
          },
        });
        const orderData = await res.json();
        const newOrders = orderData.orders;
        if (this.orders !== newOrders) {
          this.orders = newOrders;
        }
        console.log(this.orders);
      } catch (err) {
        console.log(err);
      }
    },
    async confirmPayment(e) {
      const orderId = e.target.dataset.id;
      if (e.target.innerText === '未處理') {
        try {
          const res = await fetch(this.adminUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              data: {
                id: orderId,
                paid: true,
              },
            }),
          });
          const data = await res.json();
          console.log(data);
          this.getOrderList();
        } catch (err) {
          console.log(err);
        }
      }
      if (e.target.innerText === '已付款') {
        try {
          const res = await fetch(this.adminUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              data: {
                id: orderId,
                paid: false,
              },
            }),
          });
          const data = await res.json();
          console.log(data);
          this.getOrderList();
        } catch (err) {
          console.log(err);
        }
      }
    },

    async deleteOrder(e) {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`${this.adminUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: this.token,
          },
        });
        const msg = res.json();
        console.log(msg);
        this.getOrderList();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAllOrder() {
      let yes = confirm('確定刪除所有訂單？');
      if (yes) {
        try {
          const res = await fetch(this.adminUrl, {
            method: 'DELETE',
            headers: {
              Authorization: this.token,
            },
          });
          const data = await res.json();
          console.log(data.message);
          this.getOrderList();
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  mounted() {
    this.getOrderList();
  },
  watch: {
    orders: {
      handler() {},
    },
  },
};
</script>
<style></style>
