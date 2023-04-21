<template>
  <div class="home">
    <h1>Bienvenido a nuestra Página de Programación</h1>

    <hr>
    <h2>Categories</h2>
    <RouterLink v-for="(category, index) in blogStore.categories" :key="index" v-html="category"
      :to="{ name: 'blog', query: { searchterm: normalizeString(category) } }" />
    <hr>
    <h2>Etiquetas</h2>
    <RouterLink v-for="(tag, index) in blogStore.tags" :key="index" v-html="tag"
      :to="{ name: 'blog', query: { searchterm: normalizeString(tag) } }" />
    <hr>
  </div>
</template>

<script setup>
import { useBlogStore } from '../stores/blog';
import useStringEditor from '../composables/useStringEditor';

const blogStore = useBlogStore();

const { normalizeString } = useStringEditor();
</script>

<style scoped>
h2 {
  text-decoration: underline lightblue;
}

a {
  display: block;
}
</style>