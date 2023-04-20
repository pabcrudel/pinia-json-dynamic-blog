<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>