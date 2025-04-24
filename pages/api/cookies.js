import { cookies } from 'next/headers';
import { posts } from '../content'

export default async function handler(req, res) {
    console.log("Cookies request", req.cookies);
    const lastPostVisit = req.cookies['lastPostVisit'];
    let initialVisit = req.cookies['initialVisit'];

    if (!initialVisit) {
        initialVisit = Date.now();
        res.cookies.set("initialVisit", initialVisit);
    }

    const count = posts.map(post => post.meta.slug).toReversed().indexOf(lastPostVisit);

    console.log("Cookies response", lastPostVisit, initialVisit);

    res.status(200).json({
        lastPostVisit: lastPostVisit,
        initialVisit: initialVisit,
        count
    });
}