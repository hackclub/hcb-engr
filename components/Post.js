import { useRouter } from "next/router";
import { Badge, Box, Card, Container, Grid, Heading, Link, Text } from "theme-ui"
import { authors } from "@/content/index.js"
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

// for tags, list each type of tag
/**
 * @typedef {Object} PostMeta
 * @property {string} category - The category of the post
 * @property {string} title - The title of the post
 * @property {string} author - The author of the post
 * @property {Date} date - The date of the post
 * @property {Array.<"Ledger"|"Security"|"Cards"|"Receipts"|"Invoices"|"Donations"|"Transfers">} tags - The tags of the post
 * @property {string} slug - The slug of the post
    */


export function Author({ id, overrideText }) {
    const author = authors[id];

    console.log({ author });

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
            <Image src={author.avatar} alt={author.name} style={{ height: "32px", width: "32px", borderRadius: "50%" }} />
            <Heading as="h3" variant="subheadline" sx={{ color: "muted", m: 0 }}>
                {overrideText ? overrideText : author.role ? `${author.name}, ${author.role}` : author.name}
            </Heading>
        </Box>
    )
}

function PostContent({ children, meta, skipAuthor }) {
    let { category, title, author, date, tags, slug } = meta;
    tags ||= [];

    const router = useRouter();

    const [back, setBack] = useState(false);

    useEffect(() => {
        console.log(router.query);
        if (router.query["read-more"] === "") {
            setBack(true);
            router.push(`/posts/${slug}`);
        }
    }, [router.query]);

    return (
        <Box className="post" mb={4}>
            {back && <Text variant="subheadline" mb={5}>
                <Link href={`/#${slug}`}>← Back</Link>
            </Text>}


            <Heading as="h2" variant="headline" id={slug}>
                {router.pathname == "/" ? <Link href={`/posts/${slug}?read-more`} color="blue">{title}</Link> : title}
            </Heading>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 2 }}>

                <Heading as="h3" variant="subheadline" sx={{ color: "muted", m: 0 }}>
                    {date.toLocaleDateString()}
                </Heading>

                {category == "new" && <Badge variant="pill" sx={{
                    borderRadius: 4
                }}>New Feature</Badge>}
                {category == "improvement" && <Badge variant="pill" bg="blue" sx={{
                    borderRadius: 4
                }}>Improvement</Badge>}
                {category == "newsletter" && <Badge variant="pill" bg="purple" sx={{
                    borderRadius: 4
                }}>Newsletter</Badge>}

                {tags.includes("ledger") && <Badge variant="outline" color="red" sx={{
                    fontWeight: "bold"
                }}>Ledger</Badge>}
                {tags.includes("security") && <Badge variant="outline" color="orange" sx={{
                    fontWeight: "bold"
                }}>Security</Badge>}
                {tags.includes("cards") && <Badge variant="outline" color="yellow" sx={{
                    fontWeight: "bold"
                }}>Cards</Badge>}
                {tags.includes("receipts") && <Badge variant="outline" color="green" sx={{
                    fontWeight: "bold"
                }}>Receipts</Badge>}
                {tags.includes("invoices") && <Badge variant="outline" color="cyan" sx={{
                    fontWeight: "bold"
                }}>Invoices</Badge>}
                {tags.includes("donations") && <Badge variant="outline" color="blue" sx={{
                    fontWeight: "bold"
                }}>Donations</Badge>}
                {tags.includes("transfers") && <Badge variant="outline" color="purple" sx={{
                    fontWeight: "bold"
                }}>Transfers</Badge>}

            </Box>

            <Box className="post-content">
                {children}
            </Box>

            {author && !skipAuthor && <Author id={author} />}
        </Box>
    )
}

export function Post({ children, meta, skipAuthor }) {


    return (
        <PostContext.Provider value={meta}>
            <PostContent meta={meta} skipAuthor={skipAuthor}>{children}</PostContent>
        </PostContext.Provider>
    );
}

export function Preview ({ children, skipLink }) {
    const meta = useContext(PostContext);

    return (
        <>
            <Box className="post-preview">{children}</Box>

            {!skipLink && (
                <Heading as="h3" variant="subheadline" mt={2} className="post-link">
                    <Link href={`/posts/${meta.slug}?read-more`}>Read more →</Link>
                </Heading>
            )}
        </>
    );
}

export default Post;