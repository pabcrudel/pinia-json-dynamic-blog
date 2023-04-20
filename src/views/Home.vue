<template>
  <div class="home">
    <h1>This is the home page</h1>

    <hr>
    <h2>Search bar</h2>
    <input type="search" name="search" id="search" v-model="search">
    <div class="results">
      <RouterLink v-for="post in blogStore.searchPosts(search)" :key="post.name" v-html="post.navigation.title"
        :to="'/' + post.metadata.slug" />
    </div>
    <hr>

    <h2>Categories</h2>
    <p v-for="(category, index) in blogStore.categories" :key="index" v-html="category" />
    <hr>

    <h2>Related post</h2>
    <p v-for="post in blogStore.getRelatedPostsByCategory('moBile')" :key="post.name" v-html="post.navigation.title" />
    <hr>

    <h2>Unrelated posts</h2>
    <p v-for="post in blogStore.getUnrelatedPostsByCategory('moBile')" :key="post.name" v-html="post.navigation.title" />
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../stores/blog';

const blogStore = useBlogStore();

let search = ref("");
</script>

<style scoped>
hr {
  margin: 1rem 0;
}

h2 {
  text-decoration: underline lightblue;
}

.results {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}</style>