<template>
  <h1 v-html="blogStore.blogTitle"/>

  <hr>
  <ChangeBlogTopic/>
  <hr>
  <section class="searchSection">
    <header class="searchHeader">
      <h2>¿Que estas buscando?</h2>
      <input type="search" name="search" v-model="searchTerm">
    </header>
    <LinkedPostList v-if="result.size > 0" :posts="result" />
    <template v-else>
      <p>No hay nada...</p>
      <hr>
      <LinkedPostList :title="'Otros articulos que podrian interesarte'" :posts="blogStore.posts" />
    </template>
    <hr>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';
import useStringEditor from '../composables/useStringEditor';

import LinkedPostList from '../components/LinkedPostList .vue';
import ChangeBlogTopic from '../components/ChangeBlogTopic.vue';

const route = useRoute();

const { capitalizeFirstLetterAndReplaceDash } = useStringEditor();

const blogStore = useBlogStore();

const searchTerm = ref(route.query.searchterm ? capitalizeFirstLetterAndReplaceDash(route.query.searchterm.replace(/#/g, '')) : "");

const result = computed(() => {
  return blogStore.searchPosts(searchTerm.value);
});
</script>