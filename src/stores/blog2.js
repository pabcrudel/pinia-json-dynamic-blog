import { defineStore } from 'pinia';
import axios from 'axios';

import router from '../router/index';

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        posts: [],
        categories: new Set(),
        slugs: new Set(),
        isLoading: true,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get('/main.json');
                this.posts = response.data;

                this.storeCategoriesAndSlugs();
            }
            catch (error) {
                console.log(error)
                this.error = error;
            }
            finally { this.isLoading = false; };
        },
        storeCategoriesAndSlugs() {
            this.posts.map(post => {
                post.categories.map(category => this.categories.add(category));

                this.slugs.add(post.metadata.slug);
            });
        },
        beforeEnter(to, next) {
            if (this.isLoading) {
                this.$onAction(({ after, name }) => {
                    if (name === 'storeCategoriesAndSlugs') after(() => this.isValidSlug(to, next));
                });
            }
            else this.isValidSlug(to, next);
        },
        isValidSlug(to, next) {
            if (this.slugs.has(to.params.slug)) next()
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
        getPostBySlug: (state) => {
            return (_slug) => {
                return state.posts.find(post => post.metadata.slug === _slug);
            };
        },
        getRelatedPosts: (state) => {
            return (_post) => {
                return new Set([...state.posts.filter(post => {
                    return post.categories.some(category => _post.categories.includes(category)) && post.name != _post.name;
                })]);
            };
        },
        getPostsByCategory: (state) => {
            return (_category, related = true) => {
                const findCategory = (categories) => categories.find(category => category.toLowerCase() === _category.toLowerCase());

                const filteredPosts = new Set([...state.posts.filter(post => {
                    return related ?
                        findCategory(post.categories) :
                        !findCategory(post.categories)
                })]);

                return filteredPosts;
            };
        },
        getPostsByCategories: (getters) => {
            return (_categories, related = true) => {
                const filteredPosts = new Set();

                _categories.forEach(category => {
                    getters.getPostsByCategory(category, related).forEach(post => filteredPosts.add(post));
                });

                return filteredPosts;
            }
        },
    },
});