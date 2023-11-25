<template>
    <h1 v-html="post.title" />
    <hr>
    <p v-html="post.content" />
    <hr>
    <LinkedSearchTermList class="post" :title="'Etiquetas'" :terms="post.tags" />

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
import { useHead } from '@unhead/vue';

import LinkedPostList from '../components/LinkedPostList .vue';
import LinkedSearchTermList from '../components/LinkedSearchTermList.vue';

const route = useRoute();

const blogStore = useBlogStore();
const post = blogStore.getPostByPath(route.fullPath);
const relatedPosts = blogStore.getRelatedPosts(post.category, post.name);
const unrelatedPosts = blogStore.getPostsByProp("category", post.category, false);

const { title, description } = post.metadata;
useHead({
    title,
    meta: [
        { name: 'description', content: description }
    ]
});
</script>