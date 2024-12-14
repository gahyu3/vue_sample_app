import { createRouter, createWebHistory } from 'vue-router';
import ApiTest from '@/components/ApiTest.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WelcomeItem from '@/components/WelcomeItem.vue';
import TheWelcome from '@/components/TheWelcome.vue';
import Todos from '../components/todos/Todos.vue';
import Show from '../components/todos/Show.vue';

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/todos', component: Todos },
  { path: '/todos/:id', component: Show }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;