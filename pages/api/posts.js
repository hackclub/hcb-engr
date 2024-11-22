import { posts } from "@/content";

export default async function handler(req, res) {
    return res.status(200).json(posts.map(post => post.meta));
}