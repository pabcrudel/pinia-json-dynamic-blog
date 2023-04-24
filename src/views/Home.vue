<template>
  <div class="home">
    <h1>Bienvenido a nuestra Página de Programación</h1>

    <hr>
    <LinkedSearchTermList :title="'Categorias'" :terms="blogStore.categories"/>
    <hr>
    <LinkedSearchTermList :title="'Etiquetas'" :terms="blogStore.tags"/>
    <hr>
  </div>
</template>

<script setup>
import { useBlogStore } from '../stores/blog';

import LinkedSearchTermList from '../components/LinkedSearchTermList.vue';

const blogStore = useBlogStore();
</script>