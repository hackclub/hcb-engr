import { posts } from '../../content'

export default async function handler(req, res) {
    const maintenance = posts.filter(post => post.meta.category === "maintenance").sort((a, b) => b.meta.date - a.meta.date)[0];
    res.redirect(301, `/preview/${maintenance.meta.slug}`);
}