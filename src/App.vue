<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <template v-if="!blogStore.loading && blogStore.error === null">
    <RouterView />
  </template>
</template>

<script setup>
import { useBlogStore } from './stores/blog'

useBlogStore().fetchPosts();

const blogStore = useBlogStore();
</script>