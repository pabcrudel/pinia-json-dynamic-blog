<template>
    <h1>Explora el mundo de la programación</h1>

    <hr>
    <h2>¿Que estas buscando?</h2>
    <input type="search" name="search" id="search" v-model="search" style="width: 320px;">
    <LinkedPostList :posts="blogStore.searchPosts(search)" />
    <hr>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';
import useStringEditor from '../composables/useStringEditor';

import LinkedPostList from '../components/LinkedPostList .vue';

const route = useRoute();

const { capitalizeFirstLetterAndReplaceDash } = useStringEditor();

const blogStore = useBlogStore();

const search = ref(route.query.searchterm ? capitalizeFirstLetterAndReplaceDash(route.query.searchterm.replace(/#/g, '')) : "");
</script>