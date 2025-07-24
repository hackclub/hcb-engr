import { cookies } from 'next/headers';
import { posts } from '../../content'

export default async function handler(req, res) {
    console.log("Cookies request", req.cookies);
    const lastPostVisit = req.cookies['lastPostVisit'];
    let setInitialVisit = null;
    const initialVisit = req.cookies['initialVisit'] ? req.cookies['initialVisit'] : (setInitialVisit = Date.now());

    const count = posts.map(post => post.meta.slug).toReversed().indexOf(lastPostVisit);

    console.log("Cookies response", lastPostVisit, initialVisit);

    if (setInitialVisit) {
        res.status(200).setHeader("Set-Cookie", "initialVisit=" + initialVisit).json({ count });
    } else {
        res.status(200).json({ count });
    }
}