import { posts } from "@/content";

function getStorage() {
    const raw = window.localStorage.getItem("widgetStorage");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function setStorage(data) {
    window.localStorage.setItem("widgetStorage", JSON.stringify(data));
}

function initialize() {
    setStorage({
        initializedAt: Date.now(),
        latestPost: posts.toReversed()?.[0]?.meta?.slug
    });
}

export function getUnreads() {
    const data = getStorage();
    if (!data) {
        initialize();
        return 0;
    }
    const latestViewedIndex = posts.findIndex(post => post.meta.slug === data.latestPost);
    const latestPostIndex = posts.length - 1;

    return latestPostIndex - latestViewedIndex;
}

export function logView() {
    const data = getStorage();
    if (!data) return initialize();

    setStorage({
        ...data,
        latestPost: posts.toReversed()?.[0]?.meta?.slug
    });
}