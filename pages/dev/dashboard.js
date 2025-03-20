import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { authors, posts } from '@/content'
import Head from 'next/head'
import { Box, Container, Flex, Heading, useColorMode } from 'theme-ui'

export default function Dashboard() {
    const [colorMode, setColorMode] = useColorMode();
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Header />
            <Box as="main" sx={{ color: 'text' }}>
                <Container
                    as="article"
                    variant="wide"
                    sx={{ pt: 3, pb: [3, 4], minHeight: 'calc(100vh - 200px)', px: "82px" }}
                >
                    <Heading as="h1" variant="headline">Dashboard</Heading>

                    <pre><code>{JSON.stringify({
                        authors: {
                            count: Object.keys(authors).length,
                            names: Object.keys(authors),
                            missing: [... new Set(posts.map(post => post.meta.authors).flat())].filter(author => !Object.keys(authors).includes(author))
                        },
                        posts: {
                            count: posts.length,
                            urls: posts.map(post => `https://bank.engineering/${post.meta.slug}`)
                        },
                        colorMode
                    }, null, 4)}</code></pre>
                </Container>
            </Box>
            <Footer />

        </>
    )
}

export function getServerSideProps() {
    return process.env.NODE_ENV === "development" ? { props: {} } : { notFound: true }
}