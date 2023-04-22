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
      path: '/:searchTerm',
      redirect: to => {
        return { path: '/blog', query: { searchterm: to.params.searchTerm } }
      }
    },
    {
      path: '/:category/:slug',
      name: 'post',
      component: () => import('../views/Post.vue'),
      beforeEnter: async (to, from, next) => {
        await useBlogStore().awaitDataLoading();

        if (useBlogStore().paths.has(to.fullPath)) next();
        else {
          next({
            name: 'home',
            replace: true,
          });
        };
      },
    }
  ]
})

export default router
