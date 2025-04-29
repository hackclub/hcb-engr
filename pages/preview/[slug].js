import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Author, PostTags } from '@/components/Post'
import { posts } from '@/content/index'
import { DisplayProvider } from '@/lib/display'
import Head from 'next/head'
import { useEffect } from 'react'
import { Box, Card, Container, Flex, Grid, Heading, Link, Text } from 'theme-ui'
import Cookies from 'js-cookie'

const relatedPosts = post => {
    const { meta } = post;

    const relatedPosts = [];

    for (const post of posts.filter(post => post.meta.slug !== meta.slug)) {
        const sharedTags = (post.meta.tags || []).filter(tag => (meta.tags || []).includes(tag)).length;
        const sharedTitleWords = Math.min(post.meta.title.split(' ').filter(word => meta.title.split(' ').includes(word)).length, 99);
        const sharedAuthors = post.meta.authors.filter(author => meta.authors.includes(author)).length;
        const sharedCategory = post.meta.category === meta.category;
        const timeDifferenceInDays = Math.abs(meta.date - post.meta.date) / (1000 * 60 * 60 * 24);

        const score = sharedTags * 100_000_000_000 + sharedTitleWords * 1_100_000_000 + sharedAuthors * 100_000_000 + sharedCategory * 10_000 + (9_000 - timeDifferenceInDays);
        relatedPosts.push({ post, score });
    }

    relatedPosts.sort((a, b) => b.score - a.score);

    // console.log({ relatedPosts })

    return relatedPosts.slice(0, 3).map(({ post }) => post);
}

export default function Post({ slug }) {
    const post = posts.find(post => post.meta.slug === slug)
    const PostBody = post.component

    console.log("FOOBAR", post.meta.primaryImage)
    const date = post.meta.date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: "Etc/UTC"
    });

    useEffect(() => {
        if (!Cookies.get("initialVisit")) {
            Cookies.set("initialVisit", Date.now());
        }

        const sendHeight = () => {
            const height = Math.max(
                document.body.scrollHeight, document.body.offsetHeight,
                document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
            );

            window.parent.postMessage({ height }, "*")
        };

        sendHeight();

        window.addEventListener("resize", sendHeight);
        window.addEventListener("load", sendHeight);
        window.addEventListener("DOMContentLoaded", sendHeight);
    }, []);

    return (
        <DisplayProvider display="detail">
            <Head>
                <title>{post.meta.title}</title>
                <meta
                    property='og:description'
                    content={post.meta.description ? `${post.meta.description} • ${date}` : date}
                />
                {post.meta.primaryImage ? <meta property="og:image" content={"https://bank.engineering" + post.meta.primaryImage.src} /> : null}

            </Head>
            <Header post={post} small />
            <Box as="main" sx={{ color: 'text' }}>
                <Container
                    as="article"
                    variant="wide"
                    sx={{ pt: 1, pb: [3, 4] }}
                >
                    <Flex
                        sx={{
                            flexDirection: ['column', 'column', 'column', 'row'],
                            justifyContent: 'space-between',
                            px: [3, 3, "66px"],
                            gap: 5,
                            mt: 2
                        }}
                        gap={6}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '800px'
                            }}
                        >
                            <PostBody />
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Box as="footer" sx={{ bg: 'sheet', color: 'text' }}>
                <Container
                    as="article"
                    variant="wide"
                    sx={{ py: 4 }}
                >
                    <Flex
                        sx={{
                            flexDirection: ['column', 'column', 'column', 'row'],
                            justifyContent: 'space-between',
                            px: [3, 3, "66px"],
                            gap: 5
                        }}
                        gap={6}
                    >
                        <Link href="/">
                            <Heading as="h3" my={0}>Read more posts from HCB →</Heading></Link>
                    </Flex></Container>
            </Box>        </DisplayProvider>
    )
}

export async function getStaticPaths() {
    // console.log(posts);


    const paths = posts.map(post => ({
        params: {
            slug: post.meta.slug
        }
    }))

    // console.log(paths)

    return {
        paths,
        fallback: false // false or "blocking"
    }
}

export async function getStaticProps({ params }) {
    const post = posts.find(post => post.meta.slug === params.slug)

    return {
        props: {
            slug: params.slug
        }
    }
}
