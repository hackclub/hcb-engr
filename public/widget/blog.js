window.parent.postMessage({ message: "Hello from blog.js" }, "*");

fetch("/api/posts").then(res => res.json()).then(posts => {
    const latestPostViewed = localStorage.getItem("latestPost");

    const latestViewedIndex = posts.findIndex(post => post.slug === latestPostViewed);

    const unread = posts.length - latestViewedIndex;

    console.log({ unread });
});