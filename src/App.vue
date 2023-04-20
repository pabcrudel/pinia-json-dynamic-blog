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
import { useBlogStore } from './stores/blog'

const blogStore = useBlogStore();
blogStore.fetchPosts()
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
}
hr {margin: 1rem 0;}
</style>