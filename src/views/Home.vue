<template>
  <div class="home">
    <h1>This is the home page</h1>
    <input type="search" name="search" id="search" v-model="search">
    <p v-for="post in blogStore.searchPosts(search)" :key="post.name" v-html="post.navigation.title"/>
    <hr>
    <p v-for="(category, index) in blogStore.categories" :key="index" v-html="category"/>
    <hr>
    <p v-for="post in blogStore.getRelatedPostsByCategory('moBile')" :key="post.name" v-html="post.navigation.title"/>
    <hr>
    <p v-for="post in blogStore.getUnrelatedPostsByCategory('moBile')" :key="post.name" v-html="post.navigation.title"/>
    <hr>
    <p v-html="blogStore.getPostByName('docker-swarm') ? blogStore.getPostByName('docker-swarm').navigation.title : ''"/>
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore();

let search = ref("");
</script>

<style scoped>
hr {margin: 1rem 0;}
</style>