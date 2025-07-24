import { Badge } from 'theme-ui';
import { posts } from '../content'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

export default function Widget() {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (!Cookies.get("initialVisit")) {
            Cookies.set("initialVisit", Date.now());
        }

        const index = posts.map(post => post.meta.slug).toReversed().indexOf(Cookies.get("lastPostVisit"));
        setNumber(index);

        console.log(Cookies.get("lastPostVisit"));
        console.log(Cookies.get("initialVisit"));
    }, []);

    return (
        <>
            <style jsx global>{`
                html, body {
                    background: transparent !important;
                }
            `}</style>
            <a href="https://bank.engineering" target="_blank">
                {number >= 1 ? (
                    <Badge variant="pill"><span style={{
                        transform: "scale(1.5)",
                        display: "block"
                    }}>{number}</span></Badge>
                ) : (
                    <Badge variant="pill" bg="muted">​</Badge>
                    // zero width space             ^
                )}
            </a>
        </>
    )
}