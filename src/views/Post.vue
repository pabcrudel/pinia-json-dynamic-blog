<template>
    <h1 v-html="post.navigation.title" />
    <hr>
    <p v-html="post.content" />
    <hr>
    <LinkedPostList :title="'Articulos Relacionados'" :posts="blogStore.getPostsByCategories(post.categories)"/>
    <hr>
    <LinkedPostList :title="'Otros articulos que podrian interesarte'" :posts="blogStore.getPostsByCategories(post.categories, false)"/>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';

import LinkedPostList from '../components/LinkedPostList .vue';

const route = useRoute();

const blogStore = useBlogStore();
const post = blogStore.getPostBySlug(route.params.slug);
</script>