import { posts } from '../../content'

export default async function handler(req, res) {
    const maintenance = posts.filter(post => post.meta.category === "maintenance").filter(post => Math.abs(post.meta.maintenanceDate - new Date()) < 1_000 * 60 * 60 * 2).length > 0;
    return res.json({ maintenance });
}