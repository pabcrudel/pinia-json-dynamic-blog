import { defineStore } from 'pinia';
import axios from 'axios';

import useStringEditor from '../composables/useStringEditor';

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        topics: [
            { name: "programming", title: "Programación" },
            { name: "sciencefiction", title: "Ciencia Ficción" },
            { name: "themandalorian", title: "The Mandalorian" }
        ],
        currentTopic: "",
        homeTitle: "",
        blogTitle: "",
        posts: new Set(),
        categories: new Set(),
        tags: new Set(),
        paths: new Set(),
        isLoading: true,
        error: null,
    }),
    actions: {
        async fetchData(db = "programming") {
            if (this.currentTopic !== db) {
                this.$reset();
    
                this.currentTopic = db;
    
                try {
                    const response = await axios.get(import.meta.env.BASE_URL + db + ".json");
    
                    // response.data.forEach(post => this.posts.add(post));
    
                    this.storeDatabase(response.data);
                }
                catch (error) {
                    console.log(error)
                    this.error = error;
                }
                finally { this.isLoading = false; };
            };
        },
        storeDatabase(data) {
            this.homeTitle = data.homeTitle;
            this.blogTitle = data.blogTitle;
            
            data.posts.forEach(post => {
                this.categories.add(post.category);

                post.tags.forEach(tag => this.tags.add(tag));

                Object.assign(post, { path: `/${useStringEditor().normalizeString(post.category)}/${post.metadata.slug}` });
                this.paths.add(post.path)

                this.posts.add(post);
            });
        },
        async awaitDataLoading() {
            if (this.isLoading) {
                await new Promise((resolve) => {
                    this.$onAction(({ after, name }) => {
                        if (name === 'storeDatabase') after(() => resolve());
                    });
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
                let _post;

                state.posts.forEach(post => {
                    if (post.path === _path) _post = post;
                });

                return _post;
            };
        },
        getRelatedPosts: (state) => {
            return (category, name) => {
                const filteredPosts = new Set();

                state.posts.forEach(post => {
                    if (post.category === category && post.name !== name) filteredPosts.add(post);
                });

                return filteredPosts;
            };
        },
        getPostsByProp: (state) => {
            return (prop, value, related = true) => {
                const filteredPosts = new Set();

                const shouldAdd = related ?
                    post => post[prop] === value :
                    post => post[prop] !== value;

                state.posts.forEach(post => {
                    if (shouldAdd(post)) {
                        filteredPosts.add(post);
                    }
                });

                return filteredPosts;
            };
        },
        isCurrentTopic: (state) => {
            return (topic) => {return topic === state.currentTopic;}
        }
    },
});
