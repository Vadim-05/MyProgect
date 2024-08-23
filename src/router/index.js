import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import MainPage from '@/views/MainPage.vue';
import ProductsPage from '@/views/ProductsPage.vue';
import OrdersPage from '@/views/OrdersPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout, 
    children: [
      {
        path: '',
        name: 'home',
        component: MainPage,
      },
      {
        path: 'ProductsPage',
        name: 'ProductsPage',
        component: ProductsPage, 
      },
      {
        path: 'OrdersPage',
        name: 'OrdersPage',
        component: OrdersPage, 
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
