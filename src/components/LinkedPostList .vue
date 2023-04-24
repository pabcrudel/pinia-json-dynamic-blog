<template>
    <section class="linkedPostList">
        <h3 v-if="title" v-html="title" />
        <div class="list">
            <RouterLink v-for="post in posts" :key="post.name" v-html="post.metadata.title" :to="post.path" :title="post.navigation.title" />
        </div>
    </section>
</template>

<script setup>
defineProps({
    title: String,
    posts: {
        type: Set,
        required: true
    }
});
</script>