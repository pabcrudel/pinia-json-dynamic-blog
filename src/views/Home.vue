<template>
  <div class="home">
    <h1>Bienvenido a nuestra Página de Programación</h1>

    <hr>
    <h2>Categories</h2>
    <p v-for="(category, index) in blogStore.categories" :key="index" v-html="category" />
    <hr>
  </div>
</template>

<script setup>
import { useBlogStore } from '../stores/blog';

const blogStore = useBlogStore();
</script>

<style scoped>
h2 {text-decoration: underline lightblue;}
</style>