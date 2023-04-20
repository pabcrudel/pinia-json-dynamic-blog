<template>
    <h1 v-html="post.navigation.title" />
    <hr>
    <p v-html="post.content" />
    <template v-if="relatedPosts.size > 0">
        <hr>
        <LinkedPostList :title="'Articulos Relacionados'" :posts="relatedPosts" />
    </template>
    <hr>
    <LinkedPostList :title="'Otros articulos que podrian interesarte'"
        :posts="blogStore.getPostsByCategories(post.categories, false)" />
    <hr>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';

import LinkedPostList from '../components/LinkedPostList .vue';

const route = useRoute();

const blogStore = useBlogStore();
const post = blogStore.getPostBySlug(route.params.slug);
const relatedPosts = blogStore.getRelatedPosts(post);
</script>