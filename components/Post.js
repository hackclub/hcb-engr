import { useRouter } from "next/router";
import { Badge, Box, Card, Container, Flex, Grid, Heading, Link, Text, useColorMode } from "theme-ui"
import { authors } from "@/content/index.js"
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { useDisplay } from "@/lib/display";
import useDocument from "@/lib/useDocument";

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

function PostHeader({ meta }) {
    let { category, title, author, date, tags, slug } = meta;
    tags ||= [];

    const router = useRouter();
    const [colorMode] = useColorMode();

    return (
        <Box sx={{
            minWidth: "min(400px, 100%)",
            width: "400px",
            maxWidth: "400px",
        }}>
            <Heading as="h2" variant="headline" id={slug} mt={0}>
                {router.pathname == "/" ? <Link href={`/posts/${slug}?read-more`} sx={{
                    textDecoration: "none",
                    color: "inherit",
                    ":hover": {
                        color: colorMode == "dark" ? "smoke" : "slate",

                    }
                }}>{title}</Link> : title}
            </Heading>

            <Heading as="h3" mb={2} variant="subheadline" sx={{ color: "muted", m: 0, fontWeight: 500, fontSize: 1 }}>
                {date.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
            </Heading>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 2 }}>


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
        </Box>
    )
}

function PostContent({ children, meta, skipAuthor }) {
    let { category, title, author, date, tags, slug } = meta;
    tags ||= [];

    const display = useDisplay();

    if (display == "home") return (
        <Flex sx={{
            flexDirection: ["column", "column", "column", "row"],
            justifyContent: "space-between",
            px: 66,
            maxWidth: "1400px",
            mb: 4,
            gap: 5
        }}>
            <PostHeader meta={meta} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                flexGrow: "1",
                width: "100%"
            }}>


                <Box className="post" mb={4}>
                    <Box className="post-content">
                        {children}
                    </Box>

                    {author && !skipAuthor && <Author id={author} />}
                </Box>
            </Box>

        </Flex>

    )
    else return (
        <Box className="post" mb={4}>

            <PostHeader meta={meta} />

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

export function Preview({ children, skipLink }) {
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