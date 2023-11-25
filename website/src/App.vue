<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
      </nav>
    </div>
  </header>

  <p v-if="blogStore.isLoading" v-html="'Loading...'" />
  <p v-else-if="blogStore.error != null" v-html="'Error'" />
  <RouterView v-else :key="$route.fullPath" />
</template>

<script setup>
import { useBlogStore } from './stores/blog';
import { useHead } from '@unhead/vue';

const blogStore = useBlogStore();
blogStore.fetchData();

useHead({
  titleTemplate: (title) => title ? title : "Mi Blog",
});
</script>