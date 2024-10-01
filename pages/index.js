import { useEffect, useState } from "react";
import { posts } from "../content";
import { Box, Card, Container, Flex, Grid, Heading, Image, Link, Text } from "theme-ui";
import Header from "../components/Header";
import Footer from "@/components/Footer";

function PostPreview({ post }) {
    const PostBody = post.component;
    return (
        <div>
            <PostBody />
        </div>
    )
}

export default function Home() {
    return (
        <>
            <Header />


            <Box as="main" sx={{ color: 'text' }} className="post-list">
                <Container as="article" variant="wide" sx={{ pt: 3, pb: [3, 4] }}>

                    <Flex sx={{
                        flexDirection: ["column", "row"],
                        justifyContent: "space-between",
                        px: 66
                    }} gap={6}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                            width: "100%",
                            maxWidth: "800px",
                        }}>
                            {posts.toReversed().map((post) => (
                                <PostPreview key={post.meta.slug} post={post} />
                            ))}
                        </Box>

                        <Card as="aside" variant="sunken" sx={{ pt: 2, pb: [3, 4], width: "100%", height: "min-content", minHeight: "300px", maxWidth: "300px" }}>
                            <Heading as="h3" variant="headline" mt={0}>Filter</Heading>
                            <Text>TODO: add search and filters</Text>
                        </Card>
                    </Flex>
                </Container>

                <Footer />

            </Box>

        </>
    )
}

