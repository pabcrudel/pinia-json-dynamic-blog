import { defineStore } from 'pinia';
import axios from 'axios';

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        posts: [],
        loading: true,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get('/main.json');
                this.posts = response.data;
            }
            catch (error) {
                console.log(error)
                this.error = error;
            };

            this.loading = false;
        },
        /**
         * The function searches through an array of posts and returns any posts that contain all or some of the search terms. 
         * @param searchTerm - The search term that the user is looking for in the posts. It is converted to lowercase and split into an array of individual words for easier comparison with the content of the posts.
         * @returns The function `searchPosts` is returning an array of posts that match the search term provided as an argument. The posts are filtered based on whether their content includes every or some of the search terms provided.
         */
        searchPosts(searchTerm) {
            searchTerm = searchTerm.toLowerCase().split(" ");

            const matchedPosts = this.posts.filter(post => {
                const content = post.content.toLowerCase();
                return searchTerm.every(term => content.includes(term)) || searchTerm.some(term => content.includes(term));
            });

            return matchedPosts;
        }
    },
    getters: {

    },
});