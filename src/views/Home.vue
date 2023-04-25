<template>
  <div class="home">
    <h1>Bienvenido a nuestro Blog</h1>

    <hr>
    <button @click="blogStore.fetchPosts('programming');">Programacion</button>
    <button @click="blogStore.fetchPosts('sciencefiction');">Ciencia ficcion</button>
    <hr>
    <LinkedSearchTermList :title="'Categorias'" :terms="blogStore.categories"/>
    <hr>
    <LinkedSearchTermList class="columns" :title="'Etiquetas'" :terms="blogStore.tags"/>
    <hr>
  </div>
</template>

<script setup>
import { useBlogStore } from '../stores/blog';

import LinkedSearchTermList from '../components/LinkedSearchTermList.vue';

const blogStore = useBlogStore();
</script>