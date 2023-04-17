import { defineStore } from 'pinia';
import axios from 'axios';

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        posts: [],
        categories: new Set(),
        loading: true,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get('/main.json');
                this.posts = response.data;

                this.posts.map(post => post.categories.map(category => this.categories.add(category)));
            }
            catch (error) {
                console.log(error)
                this.error = error;
            };

            this.loading = false;
        },
    },
    getters: {
        /**
         * The function searches through an array of posts and returns any posts that contain all or some of the search terms. 
         * @param searchTerm - The search term that the user is looking for in the posts. It is converted to lowercase and split into an array of individual words for easier comparison with the content of the posts.
         * @returns The function `searchPosts` is returning an array of posts that match the search term provided as an argument. The posts are filtered based on whether their content includes every or some of the search terms provided.
         */
        searchPosts: (state) => {
            return (searchTerm) => {
                const terms = searchTerm.toLowerCase().split(" ");

                function getPostBySearchType(searchType) {
                    return state.posts.filter(post => {
                        const allPostValues = Object.values(post).join(" ").toLowerCase();
                        return terms[searchType](term => allPostValues.match(term));
                    });
                }

                let matchedPosts = getPostBySearchType("every");

                if (matchedPosts.length === 0) {
                    matchedPosts = getPostBySearchType("some");
                }

                return matchedPosts;
            };
        },
        getRelatedPostsByCategory: (state) => {
            return (_category) => {
                return state.posts.filter(post => post.categories.find(category => category.toLowerCase() === _category.toLowerCase()));
            };
        },
    },
});