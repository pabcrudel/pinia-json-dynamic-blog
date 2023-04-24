<template>
    <section class="linkedSearchTermList">
        <h3 v-if="title" v-html="title" />
        <div class="list">
            <RouterLink v-for="(term, index) in terms" :key="index" v-html="term"
                :to="{ name: 'blog', query: { searchterm: normalizeString(term) } }" />
        </div>
    </section>
</template>

<script setup>
import useStringEditor from '../composables/useStringEditor';

defineProps({
    title: String,
    terms: {
        type: [Set, Array],
        required: true
    }
});

const { normalizeString } = useStringEditor();
</script>