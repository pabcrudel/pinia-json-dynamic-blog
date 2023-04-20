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
  <RouterView v-else :key="$route.fullPath"/>
</template>

<script setup>
import { onUpdated } from 'vue';
import { useBlogStore } from './stores/blog'

import {useRoute} from 'vue-router';
const route = useRoute();

useBlogStore().fetchPosts();

const blogStore = useBlogStore();

// console.log(!blogStore.loading && blogStore.error === null)
// console.log("error", blogStore.error)
// console.log("loading", blogStore.loading)

onUpdated(() => {
  console.log(route.fullPath)
})
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>