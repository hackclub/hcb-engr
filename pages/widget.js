import { Badge } from 'theme-ui';
import { posts } from '../content'
import { useEffect, useState } from "react";

export default function Widget() {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("initialVisit")) {
            localStorage.setItem("initialVisit", Date.now());
        }

        const index = posts.map(post => post.meta.slug).toReversed().indexOf(localStorage.getItem("lastPostVisit"));
        setNumber(index);
    }, []);

    return (
        <a href="https://bank.engineering" target="_blank">
            {number >= 1 ? (
                <Badge variant="pill">{number}</Badge>
            ) : (
                <Badge variant="pill" bg="muted">​</Badge>
                // zero width space             ^
            )}
        </a>
    )
}