<template>
    <h1 v-html="post.title" />
    <LinkedSearchTermList :terms="post.tags"/>
    <hr>
    <p v-html="post.content" />
    <template v-if="relatedPosts.size > 0">
        <hr>
        <LinkedPostList :title="'Articulos Relacionados'" :posts="relatedPosts" />
    </template>
    <hr>
    <LinkedPostList :title="'Otros articulos que podrian interesarte'" :posts="unrelatedPosts" />
    <hr>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBlogStore } from '../stores/blog';

import LinkedPostList from '../components/LinkedPostList .vue';
import LinkedSearchTermList from '../components/LinkedSearchTermList.vue';

const route = useRoute();

const blogStore = useBlogStore();
const post = blogStore.getPostByPath(route.fullPath);
const relatedPosts = blogStore.getRelatedPosts(post.category, post.name);
const unrelatedPosts = blogStore.getPostsByProp("category", post.category, false);
</script>