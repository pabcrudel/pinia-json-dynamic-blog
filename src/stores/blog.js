import { defineStore } from 'pinia';
import axios from 'axios';

export const blogStore = defineStore({
    id: 'blog',
    state: () => ({
        articles: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchArticles() {
            const response = await axios.get('/main.json');
            console.log(response.data)
        },
    }
});