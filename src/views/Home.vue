<template>
  <div class="home">
    <h1>This is the home page</h1>
    <input type="search" name="search" id="search" v-model="search">
    <p v-for="post in blogStore.searchPosts(search)" :key="post.name" v-html="post.name"/>
    <hr>
    <p v-for="(category, index) in blogStore.categories" :key="index" v-html="category"/>
    <hr>
    <p v-for="post in blogStore.getRelatedPostsByCategory('moBile')" :key="post.name" v-html="post.name"/>
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore();

let search = ref("");
</script>