import * as rawPosts from "./posts/posts.js";
import authors from "./authors/authors.js";

const posts = Object.entries(rawPosts).map(([_, { meta, default: component }]) => ({
    meta,
    component
}));

export {
    posts,
    authors
}
