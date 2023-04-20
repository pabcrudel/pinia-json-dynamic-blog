<template>
    <section class="linkedPostList">
        <h3 v-if="title" v-html="title" />
        <RouterLink v-for="post in posts" :key="post.name" v-html="post.navigation.title"
            :to="'/' + post.metadata.slug" />
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

<style scoped>
.linkedPostList {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>