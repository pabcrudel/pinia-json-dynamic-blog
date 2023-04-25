<template>
    <section class="topicSwitch">
        <button :class="[blogStore.isCurrentTopic(topic.name) ? 'on' : 'of']" v-for="topic in blogStore.topics" :key="topic.name"
            v-html="topic.title" @click="blogStore.fetchPosts(topic.name)" />
    </section>
</template>

<script setup>
import { useBlogStore } from '../stores/blog';

const blogStore = useBlogStore();
</script>