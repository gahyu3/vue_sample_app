import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/todos/Todos.vue';

const routes = [
  { path: '/todos', component: Todos }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;