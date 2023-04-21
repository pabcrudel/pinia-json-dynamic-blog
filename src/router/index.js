import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/Home.vue';
import { useBlogStore } from '../stores/blog';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/:category/:slug',
      name: 'post',
      component: () => import('../views/Post.vue'),
      beforeEnter: (to, from, next) => useBlogStore().beforeEnter(to, next),
    }
  ]
})

export default router
