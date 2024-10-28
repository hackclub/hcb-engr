import { posts } from "../content";
import { Box, Card, Container, Flex, Grid, Heading, Image, Link, Text } from "theme-ui";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { DisplayProvider } from "@/lib/display";


function PostPreview({ post }) {
    const PostBody = post.component;
    return (
        <DisplayProvider display="home">
            <PostBody />
        </DisplayProvider>
    )
}

export default function Home() {
    return (
        <>
            <Header />

            <Box as="main" sx={{ color: 'text' }} className="post-list">
                <Container as="article" variant="wide" sx={{ pt: 3, pb: [3, 4] }}>

                    {posts.toReversed().map((post) => (
                        <PostPreview key={post.meta.slug} post={post} />
                    ))}
                </Container>

                <Footer />

            </Box>

        </>
    )
}

