<template>
    <h1 v-html="post.navigation.title"/>
    <hr>
    <p v-html="post.content"/>
    <hr>
</template>

<script setup>
import {useRoute} from 'vue-router';
import { useBlogStore } from '../stores/blog';

const route = useRoute();

const blogStore = useBlogStore();
const post = blogStore.getPostBySlug(route.params.slug);
</script>