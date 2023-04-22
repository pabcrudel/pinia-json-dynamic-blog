<template>
    <h1>Explora el mundo de la programación</h1>

    <hr>
    <h2>¿Que estas buscando?</h2>
    <input type="search" name="search" id="search" v-model="searchTerm" style="width: 320px;">
    <LinkedPostList v-if="result.size > 0" :posts="result" />
    <p v-else>No hay nada...</p>
    <hr>
    <LinkedPostList v-if="result.size === 0" :title="'Otros articulos que podrian interesarte'" :posts="blogStore.posts" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';
import useStringEditor from '../composables/useStringEditor';

import LinkedPostList from '../components/LinkedPostList .vue';

const route = useRoute();

const { capitalizeFirstLetterAndReplaceDash } = useStringEditor();

const blogStore = useBlogStore();

const searchTerm = ref(route.query.searchterm ? capitalizeFirstLetterAndReplaceDash(route.query.searchterm.replace(/#/g, '')) : "");

const result = computed(() => {
  return blogStore.searchPosts(searchTerm.value);
});
</script>