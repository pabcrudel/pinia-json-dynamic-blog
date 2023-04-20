<template>
  <div class="home">
    <h1>This is the home page</h1>

    <hr>
    <h2>Search bar</h2>
    <input type="search" name="search" id="search" v-model="search">
    <LinkedPostList :posts="blogStore.searchPosts(search)"/>
    <hr>

    <h2>Categories</h2>
    <p v-for="(category, index) in blogStore.categories" :key="index" v-html="category" />
    <hr>

    <h2>Related post</h2>
    <p v-for="post in blogStore.getPostsByCategory('moBile')" :key="post.name" v-html="post.navigation.title" />
    <hr>

    <h2>Unrelated posts</h2>
    <p v-for="post in blogStore.getPostsByCategory('moBile', false)" :key="post.name" v-html="post.navigation.title" />
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../stores/blog';

import LinkedPostList from '../components/LinkedPostList .vue';

const blogStore = useBlogStore();

let search = ref("");
</script>

<style scoped>
h2 {text-decoration: underline lightblue;}
</style>