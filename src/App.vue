<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <p v-if="blogStore.loading" v-html="'Loading...'"/>
  <p v-else-if="blogStore.error != null" v-html="'Error'"/>
  <RouterView v-else/>
</template>

<script setup>
import { useBlogStore } from './stores/blog'

useBlogStore().fetchPosts();

const blogStore = useBlogStore();

console.log(!blogStore.loading && blogStore.error === null)
console.log("error", blogStore.error)
console.log("loading", blogStore.loading)
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>