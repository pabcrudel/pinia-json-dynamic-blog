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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/:slug',
      name: 'post',
      component: () => import('../views/Post.vue'),
      beforeEnter: (to, from, next) => useBlogStore().beforeEnter(to, next),
    }
  ]
})

export default router
