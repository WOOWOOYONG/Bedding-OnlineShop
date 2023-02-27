import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Backstage from '../views/Backstage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: Backstage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
