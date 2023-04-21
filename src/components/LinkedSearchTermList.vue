<template>
    <section class="linkedSearchTermList">
        <h3 v-if="title" v-html="title" />
        <RouterLink v-for="(term, index) in terms" :key="index" v-html="term"
            :to="{ name: 'blog', query: { searchterm: normalizeString(term) } }" />
    </section>
</template>

<script setup>
import useStringEditor from '../composables/useStringEditor';

defineProps({
    title: String,
    terms: {
        type: Set,
        required: true
    }
});

const { normalizeString } = useStringEditor();
</script>

<style scoped>
.linkedSearchTermList {
    display: flex;
    flex-direction: column;
    gap: .25rem;
}
</style>