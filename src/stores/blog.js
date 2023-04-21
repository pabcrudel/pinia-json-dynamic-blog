import { defineStore } from 'pinia';
import axios from 'axios';

import useStringEditor from '../composables/useStringEditor';

import router from '../router/index';

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        posts: [],
        categories: new Set(),
        tags: new Set(),
        paths: new Set(),
        isLoading: true,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get('/posts.json');
                this.posts = response.data;

                this.storeCategoriesAndPaths();
            }
            catch (error) {
                console.log(error)
                this.error = error;
            }
            finally { this.isLoading = false; };
        },
        storeCategoriesAndPaths() {
            this.posts.map(post => {
                this.categories.add(post.category);

                post.tags.forEach(tag => this.tags.add(tag));

                Object.assign(post, {path: `/${useStringEditor().normalizeString(post.category)}/${post.metadata.slug}`});
                this.paths.add(post.path)
            });
        },
        beforeEnter(to, next) {
            if (this.isLoading) {
                this.$onAction(({ after, name }) => {
                    if (name === 'storeCategoriesAndPaths') after(() => this.isValidSlug(to, next));
                });
            }
            else this.isValidSlug(to, next);
        },
        isValidSlug(to, next) {
            if (this.paths.has(to.fullPath)) next()
            else {
                router.push({
                    name: 'home',
                    replace: true,
                });
            };
        }
    },
    getters: {
        /**
         * The function searches through an array of posts and returns a `Set` of matched posts that contain all or some of the search terms. 
         * @param searchTerm - The search term that the user is looking for in the posts. It is converted to lowercase and split into an array of individual words for easier comparison with the content of the posts.
         * @returns The function `searchPosts` is returning an array of posts that match the search term provided as an argument. The posts are filtered based on whether their content includes every or some of the search terms provided.
         */
        searchPosts: (state) => {
            return (searchTerm) => {
                const terms = searchTerm.toLowerCase().split(" ");

                const matchedPosts = new Set();

                function getPostBySearchType(searchType) {
                    state.posts.forEach(post => {
                        const allPostValues = Object.values(post).join(" ").toLowerCase();

                        if (terms[searchType](term => allPostValues.match(term))) matchedPosts.add(post);
                    });
                }
                getPostBySearchType("every");

                if (matchedPosts.size === 0) getPostBySearchType("some");

                return matchedPosts;
            };
        },
        getPostByPath: (state) => {
            return (_path) => {
                return state.posts.find(post => post.path === _path);
            };
        },
        getRelatedPosts: (state) => {
            return (_post) => {
                return new Set([...state.posts.filter(post => {
                    return post.category === _post.category && post.name != _post.name;
                })]);
            };
        },
        getPostsByCategory: (state) => {
            return (_category, related = true) => {
                const filteredPosts = new Set([...state.posts.filter(post => {
                    return related ?
                        post.category === _category :
                        post.category != _category
                })]);

                return filteredPosts;
            };
        }
    },
});