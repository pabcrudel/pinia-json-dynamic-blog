<template>
  <div class="home">
    <h1>Bienvenido a nuestro Blog</h1>

    <hr>
    <ChangeBlogTopic/>
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
import ChangeBlogTopic from '../components/ChangeBlogTopic.vue';

const blogStore = useBlogStore();
</script>