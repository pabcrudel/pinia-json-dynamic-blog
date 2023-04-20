<template>
    <h1>Explora el mundo de la programación</h1>

    <hr>
    <h2>¿Que estas buscando?</h2>
    <input type="search" name="search" id="search" v-model="search">
    <LinkedPostList :posts="blogStore.searchPosts(search)" />
    <hr>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../stores/blog';

import LinkedPostList from '../components/LinkedPostList .vue';

const blogStore = useBlogStore();

let search = ref("");
</script>